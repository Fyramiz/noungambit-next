"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Users,
  MessageCircle,
  Swords,
  Calendar,
  Trophy,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

interface UserProfile {
  id: string;
  name: string;
  nameAr?: string;
  age: number;
  joinDate: string;
  bio?: string;
  achievements?: string[];
  chessComUsername?: string | null;
  // from Chess.com
  avatar?: string;
  category?: string;
  rating?: number;
  wins?: number;
  losses?: number;
  draws?: number;
}

async function fetchChessComData(username: string) {
  try {
    const [profileRes, statsRes] = await Promise.all([
      fetch(`https://api.chess.com/pub/player/${username.toLowerCase()}`),
      fetch(`https://api.chess.com/pub/player/${username.toLowerCase()}/stats`),
    ]);
    if (!profileRes.ok || !statsRes.ok)
      throw new Error("Chess.com fetch failed");

    const profile = await profileRes.json();
    const stats = await statsRes.json();

    // extract basic info
    const avatar = profile.avatar ?? "";
    const category = profile.title ?? "";

    // record
    const recordObj =
      stats.chess_blitz?.record ||
      stats.chess_rapid?.record ||
      stats.chess_bullet?.record ||
      {};
    const { win = 0, loss = 0, draw = 0 } = recordObj;

    // rating
    const rating = stats.chess_rapid?.last?.rating || 0;

    return {
      avatar,
      category,
      rating,
      wins: win,
      losses: loss,
      draws: draw,
    };
  } catch (e) {
    console.error("Chess.com error for", username, e);
    return {
      avatar: "",
      category: "",
      rating: 0,
      wins: 0,
      losses: 0,
      draws: 0,
    };
  }
}

export default function PlayersPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [players, setPlayers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from("user_profiles").select("*");
      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }
      const enriched = await Promise.all(
        data.map(async (p) =>
          p.chessComUsername
            ? {
                ...p,
                ...(await fetchChessComData(p.chessComUsername)),
              }
            : p
        )
      );
      setPlayers(enriched);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = players
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.nameAr && p.nameAr.includes(search))
    )
    .filter((p) =>
      categoryFilter === "all"
        ? true
        : p.category?.toLowerCase() === categoryFilter
    )
    .filter((p) =>
      statusFilter === "all"
        ? true
        : (p.chessComUsername ? "online" : "offline") === statusFilter
    );

  const getStatusColor = (s: string) =>
    s === "online"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  const getRatingColor = (r?: number) =>
    !r
      ? "text-gray-600"
      : r >= 2100
      ? "text-purple-600"
      : r >= 1900
      ? "text-blue-600"
      : r >= 1700
      ? "text-green-600"
      : "text-gray-600";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900">
            Players Directory
          </h1>
        </header>

        {/* Filters */}
        <Card className="mb-8 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Users className="h-5 w-5" /> Find Players
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search players..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Users className="h-4 w-4" /> {filtered.length} players
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Player Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => {
            const status = p.chessComUsername ? "online" : "offline";
            return (
              <Card className="border-amber-200 hover:shadow-lg">
                <CardHeader className="pb-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {p.name}
                    </h3>
                    {p.nameAr && (
                      <p className="text-sm text-gray-600">{p.nameAr}</p>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2">
                    <div>
                      <span className="text-gray-500 text-sm">ELO Rating</span>
                      <div
                        className={`font-semibold text-lg ${getRatingColor(
                          p.rating
                        )}`}
                      >
                        {p.rating ?? "–"}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Age</span>
                      <div className="font-semibold">{p.age} years</div>
                    </div>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <Badge className="bg-green-100 text-green-800">
                      {p.wins ?? 0} W
                    </Badge>
                    <Badge className="bg-red-100 text-red-800">
                      {p.losses ?? 0} L
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-800">
                      {p.draws ?? 0} D
                    </Badge>
                  </div>
                  {p.bio && (
                    <div>
                      <span className="text-gray-500 text-sm">Bio:</span>
                      <p className="text-sm text-gray-700">{p.bio}</p>
                    </div>
                  )}
                  {p.achievements?.length && (
                    <div>
                      <span className="text-gray-500 text-sm">
                        Achievements:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1 text-xs">
                        {p.achievements.map((a, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <Trophy className="h-3 w-3" />
                            {a}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {!filtered.length && (
          <Card className="border-amber-200 mt-8">
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No players found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
