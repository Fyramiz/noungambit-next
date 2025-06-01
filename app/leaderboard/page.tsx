"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Search, Filter, TrendingUp, TrendingDown } from "lucide-react"

// Mock data for players
const mockPlayers = [
  {
    id: 1,
    name: "Mbark Draoui",
    nameAr: "مبارك ادراوي",
    rating: 100000,
    ratingChange: +25,
    wins: 1023425,
    losses: 0,
    draws: 8,
    tournaments: 15,
    age: 14,
    category: "GM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Whatever",
    nameAr: "مهما يكن",
    rating: 2089,
    ratingChange: +18,
    wins: 38,
    losses: 15,
    draws: 12,
    tournaments: 12,
    age: 24,
    category: "Senior",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Whatever",
    nameAr: "مهما يكن",
    rating: 2045,
    ratingChange: -8,
    wins: 42,
    losses: 18,
    draws: 10,
    tournaments: 18,
    age: 32,
    category: "Senior",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Whatever",
    nameAr: "مهما يكن",
    rating: 1987,
    ratingChange: +12,
    wins: 35,
    losses: 20,
    draws: 15,
    tournaments: 14,
    age: 26,
    category: "Senior",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Whatever",
    nameAr: "مهما يكن",
    rating: 1923,
    ratingChange: +5,
    wins: 28,
    losses: 16,
    draws: 11,
    tournaments: 10,
    age: 16,
    category: "Junior",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Whatever",
    nameAr: "مهما يكن",
    rating: 1876,
    ratingChange: -3,
    wins: 31,
    losses: 22,
    draws: 9,
    tournaments: 13,
    age: 15,
    category: "Junior",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  const filteredPlayers = mockPlayers
    .filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) || player.nameAr.includes(searchTerm)
      const matchesCategory = categoryFilter === "all" || player.category.toLowerCase() === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "wins":
          return b.wins - a.wins
        case "tournaments":
          return b.tournaments - a.tournaments
        default:
          return b.rating - a.rating
      }
    })

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 2:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
    }
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Leaderboard</h1>
          <p className="text-lg text-green-700">لوحة المتصدرين</p>
          <p className="text-gray-600 mt-2">Current rankings based on ELO ratings and tournament performance</p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search players..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="junior">Junior</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">ELO Rating</SelectItem>
                  <SelectItem value="wins">Total Wins</SelectItem>
                  <SelectItem value="tournaments">Tournaments</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Export Rankings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Players Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {filteredPlayers.slice(0, 3).map((player, index) => (
            <Card
              key={player.id}
              className={`border-2 ${index === 0 ? "border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50" : index === 1 ? "border-gray-400 bg-gradient-to-br from-gray-50 to-slate-50" : "border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50"}`}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">{getRankIcon(index)}</div>
                <Avatar className="h-16 w-16 mx-auto mb-2">
                  <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                  <AvatarFallback>
                    {player.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{player.name}</CardTitle>
                <p className="text-sm text-gray-600">{player.nameAr}</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-2">
                  <Badge className={getRatingBadgeColor(player.rating)}>{player.rating} ELO</Badge>
                  <div className="flex items-center justify-center gap-1">
                    {player.ratingChange > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm ${player.ratingChange > 0 ? "text-green-600" : "text-red-600"}`}>
                      {player.ratingChange > 0 ? "+" : ""}
                      {player.ratingChange}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {player.wins}W - {player.losses}L - {player.draws}D
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Rankings Table */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-900">Complete Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 flex justify-center">{getRankIcon(index)}</div>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                      <AvatarFallback>
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{player.name}</h3>
                      <p className="text-sm text-gray-600">{player.nameAr}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {player.category} • Age {player.age}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-lg">{player.rating}</div>
                      <div className="text-gray-500">ELO</div>
                      <div
                        className={`flex items-center gap-1 ${player.ratingChange > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {player.ratingChange > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>
                          {player.ratingChange > 0 ? "+" : ""}
                          {player.ratingChange}
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold">{player.wins}</div>
                      <div className="text-gray-500">Wins</div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold">{player.losses}</div>
                      <div className="text-gray-500">Losses</div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold">{player.draws}</div>
                      <div className="text-gray-500">Draws</div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold">{player.tournaments}</div>
                      <div className="text-gray-500">Tournaments</div>
                    </div>

                    <Button variant="outline" size="sm" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                      View Profile
                    </Button>
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
