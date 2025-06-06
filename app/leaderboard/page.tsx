"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Search, TrendingUp, TrendingDown, Loader2 } from "lucide-react"
import { createClient } from "@/utils/supabase/client"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
)

interface UserProfile {
  id: string
  name: string
  rating: number
  ratingChange: number
  wins: number
  losses: number
  draws: number
  tournaments: number
  category: string
  age: number
  chessComUsername?: string | null
  avatar?: string
}

async function fetchChessComData(username: string) {
  try {
    const res = await fetch(`https://api.chess.com/pub/player/${username.toLowerCase()}`)
    if (!res.ok) throw new Error("User not found")
    const data = await res.json()

    const avatar = data.avatar ?? ""
    const category = data.title ?? ""

    const statsRes = await fetch(`https://api.chess.com/pub/player/${username.toLowerCase()}/stats`)
    if (!statsRes.ok) throw new Error("Stats not found")
    const statsData = await statsRes.json()

    const record = statsData.chess_blitz?.record || statsData.chess_rapid?.record || statsData.chess_bullet?.record || {}

    const wins = record.win ?? 0
    const losses = record.loss ?? 0
    const draws = record.draw ?? 0

    const rating =
      statsData.chess_blitz?.last?.rating ??
      statsData.chess_rapid?.last?.rating ??
      statsData.chess_bullet?.last?.rating ??
      0

    return { avatar, category, rating, wins, losses, draws }
  } catch (e) {
    console.error(`Failed to fetch Chess.com data for ${username}:`, e)
    return { avatar: "", category: "", rating: 0, wins: 0, losses: 0, draws: 0 }
  }
}

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [profiles, setProfiles] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase.from("user_profiles").select("*")
      if (error) {
        console.log("Error:", error)
        setLoading(false)
        return
      }
      if (!data) {
        setProfiles([])
        setLoading(false)
        return
      }

      const enrichedProfiles = await Promise.all(
        data.map(async (p) => {
          if (p.chessComUsername) {
            const chessData = await fetchChessComData(p.chessComUsername)
            return {
              ...p,
              avatar: chessData.avatar,
              category: chessData.category || p.category,
              rating: chessData.rating || p.rating,
              wins: chessData.wins,
              losses: chessData.losses,
              draws: chessData.draws,
            }
          }
          return p
        })
      )

      setProfiles(enrichedProfiles)
      setLoading(false)
    }

    fetchProfiles()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    );
  }

  const filteredPlayers = profiles
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.rating - a.rating)

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-6 w-6 text-yellow-500" />
    if (index === 1) return <Medal className="h-6 w-6 text-gray-400" />
    if (index === 2) return <Award className="h-6 w-6 text-amber-600" />
    return <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
  }

  const getRatingBadgeColor = (rating: number) => {
    if (rating >= 2100) return "bg-purple-100 text-purple-800"
    if (rating >= 1900) return "bg-blue-100 text-blue-800"
    if (rating >= 1700) return "bg-green-100 text-green-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600 mt-2 mb-6">Current rankings based on ELO ratings of members of the club</p>

        {/* Search */}
        <Card className="mb-8 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Search className="h-5 w-5" /> Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Players */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {filteredPlayers.slice(0, 3).map((player, index) => (
            <Card
              key={player.id}
              className={`border-2 ${index === 0
                ? "border-yellow-400 bg-yellow-50"
                : index === 1
                  ? "border-gray-400 bg-gray-50"
                  : "border-amber-400 bg-amber-50"
                }`}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">{getRankIcon(index)}</div>
                <CardTitle>{player.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <Badge className={getRatingBadgeColor(player.rating)}>{player.rating} ELO</Badge>
                <div className="text-sm text-gray-600">
                  {player.wins}W - {player.losses}L - {player.draws}D
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Rankings */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-900">Complete Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 flex justify-center">{getRankIcon(index)}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{player.name}</h3>

                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Badge className={getRatingBadgeColor(player.rating)}>{player.rating} ELO</Badge>
                    <div className="text-sm text-gray-600">
                      {player.wins}W - {player.losses}L - {player.draws}D
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
