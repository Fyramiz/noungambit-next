"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, MessageCircle, Swords, Calendar, Trophy } from "lucide-react"
import Link from "next/link"

// Mock data for players
const mockPlayers = [
  {
    id: 1,
    name: "Ahmed Benali",
    nameAr: "أحمد بن علي",
    rating: 2150,
    age: 28,
    joinDate: "2020-03-15",
    category: "Senior",
    status: "online",
    bio: "Passionate chess player and tournament organizer",
    achievements: ["Regional Champion 2023", "Club Champion 2022"],
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Fatima Zahra",
    nameAr: "فاطمة الزهراء",
    rating: 2089,
    age: 24,
    joinDate: "2021-01-20",
    category: "Senior",
    status: "offline",
    bio: "Chess coach and competitive player",
    achievements: ["Women's Champion 2023", "Best Coach Award"],
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Youssef Alami",
    nameAr: "يوسف العلمي",
    rating: 2045,
    age: 32,
    joinDate: "2019-08-10",
    category: "Senior",
    status: "online",
    bio: "Chess enthusiast and strategy analyst",
    achievements: ["Tournament Director", "Strategy Master"],
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "Omar Tazi",
    nameAr: "عمر التازي",
    rating: 1923,
    age: 16,
    joinDate: "2022-09-05",
    category: "Junior",
    status: "online",
    bio: "Rising star in junior chess",
    achievements: ["Junior Champion 2023", "Most Improved Player"],
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 5,
    name: "Salma Idrissi",
    nameAr: "سلمى الإدريسي",
    rating: 1876,
    age: 15,
    joinDate: "2023-02-12",
    category: "Junior",
    status: "offline",
    bio: "Young talent with great potential",
    achievements: ["Best Newcomer 2023"],
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 6,
    name: "Hassan Berrada",
    nameAr: "حسان برادة",
    rating: 1834,
    age: 45,
    joinDate: "2018-11-30",
    category: "Senior",
    status: "online",
    bio: "Veteran player and mentor",
    achievements: ["Mentor of the Year", "20+ Years Service"],
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export default function PlayersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPlayers = mockPlayers.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) || player.nameAr.includes(searchTerm)
    const matchesCategory = categoryFilter === "all" || player.category.toLowerCase() === categoryFilter
    const matchesStatus = statusFilter === "all" || player.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    return status === "online" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 2100) return "text-purple-600"
    if (rating >= 1900) return "text-blue-600"
    if (rating >= 1700) return "text-green-600"
    return "text-gray-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Players Directory</h1>
          <p className="text-lg text-green-700">دليل اللاعبين</p>
          <p className="text-gray-600 mt-2">Connect with fellow chess players in our community</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Users className="h-5 w-5" />
              Find Players
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-gray-600 flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {filteredPlayers.length} players found
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
            <Card key={player.id} className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                      <AvatarFallback>
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{player.name}</h3>
                      <p className="text-sm text-gray-600">{player.nameAr}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(player.status)}>{player.status}</Badge>
                        <Badge variant="outline">{player.category}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">ELO Rating:</span>
                    <div className={`font-semibold text-lg ${getRatingColor(player.rating)}`}>{player.rating}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Age:</span>
                    <div className="font-semibold">{player.age} years</div>
                  </div>
                </div>

                <div>
                  <span className="text-gray-500 text-sm">Bio:</span>
                  <p className="text-sm text-gray-700 mt-1">{player.bio}</p>
                </div>

                <div>
                  <span className="text-gray-500 text-sm">Achievements:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {player.achievements.map((achievement, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Trophy className="h-3 w-3 mr-1" />
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-gray-500 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Joined {new Date(player.joinDate).toLocaleDateString()}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700">
                    <Link href={`/players/${player.id}`} className="flex items-center gap-1">
                      View Profile
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    <Swords className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <Card className="border-amber-200">
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No players found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
