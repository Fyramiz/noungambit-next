"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Crown, Loader2, Star } from "lucide-react";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

export default function HomePage() {
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [pastTournamentsCount, setPastTournamentsCount] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { count: members, error: memberError } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      const { count: pastEvents, error: eventError } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .eq("incomming", false);

      if (!memberError) setMemberCount(members);
      if (!eventError) setPastTournamentsCount(pastEvents);
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Crown className="h-12 w-12 text-amber-600 mr-3" />
            <h1 className="text-5xl font-bold text-amber-900">
              Noungambit Association
            </h1>
          </div>
          <p className="text-xl text-green-700 mb-4">
            جمعية نون جامبيت للشطرنج - كلميم
          </p>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Welcome to Guelmim's premier chess organization. Join our community
            of passionate players, improve your skills, and compete in
            tournaments while building lasting friendships through the royal
            game.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Link href="/leaderboard">View Leaderboard</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <Link href="/register">Join Association</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center border-amber-200">
              <CardHeader>
                <Users className="h-8 w-8 text-amber-600 mx-auto" />
                <CardTitle className="text-2xl text-amber-900">
                  {memberCount !== null ? `${memberCount}+` : "Loading..."}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Active Members</p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <Trophy className="h-8 w-8 text-green-600 mx-auto" />
                <CardTitle className="text-2xl text-green-800">
                  {pastTournamentsCount !== null
                    ? pastTournamentsCount
                    : "Loading..."}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Tournaments Held</p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <Star className="h-8 w-8 text-green-600 mx-auto" />
                <CardTitle className="text-2xl text-green-800">4.5/5</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We Are Rated 4.5 Stars by people who played in the club
                </p>
                <Button
                  variant="secondary"
                  className="text-green-600 hover:underline mt-2"
                >
                  Rate Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
