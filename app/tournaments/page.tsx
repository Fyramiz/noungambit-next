"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Search, Filter, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"


export default function LeaderboardPage() {
    const [searchTerm, setSearchTerm] = useState("")




    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-amber-900 mb-2">Tournaments</h1>
                    <p className="text-gray-600 mt-2">Meet and Play with People in tournaments</p>
                </div>

                {/* Full Rankings Table */}
                <Card className="border-amber-200">
                    <CardHeader>
                        <CardTitle className="text-amber-900">Current Tournaments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">

                            <div
                                key={1}
                                className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 flex justify-center"></div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900">The Assosiation center</h3>
                                        <p className="text-sm text-gray-600">Today 16:00 GMT+1                                                  <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700">
                                            <Link href={"https://maps.google.com"} className="flex items-center gap-1">
                                              View On Map
                                            </Link>
                                        </Button></p>
                                    </div>
                                </div>
                            </div>
                            <div
                                key={2}
                                className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 flex justify-center"></div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900">Cafe Dubai</h3>
                                        <p className="text-sm text-gray-600">Tuesday 17:00 GMT+1                                                  <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700">
                                            <Link href={"https://maps.google.com"} className="flex items-center gap-1">
                                              View On Map
                                            </Link>
                                        </Button></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </CardContent>
                
                </Card>
            </div>
        </div>
    )
}
