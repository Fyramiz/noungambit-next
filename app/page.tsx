import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, GraduationCap, Crown, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Crown className="h-12 w-12 text-amber-600 mr-3" />
            <h1 className="text-5xl font-bold text-amber-900">Noungambit Association</h1>
          </div>
          <p className="text-xl text-green-700 mb-4">جمعية نون جامبيت للشطرنج - كلميم</p>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Welcome to Guelmim's premier chess organization. Join our community of passionate players, improve your
            skills, and compete in tournaments while building lasting friendships through the royal game.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
              <Link href="/leaderboard">View Leaderboard</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
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
                <CardTitle className="text-2xl text-amber-900">30+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Active Members</p>
              </CardContent>
            </Card>
            <Card className="text-center border-green-200">
              <CardHeader>
                <Trophy className="h-8 w-8 text-green-600 mx-auto" />
                <CardTitle className="text-2xl text-green-800">25</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Tournaments Held</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Trophy className="h-10 w-10 text-amber-600 mb-2" />
                <CardTitle className="text-amber-900">Competitive Play</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Meet and Play with players from Guelmim with your same level
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-10 w-10 text-amber-600 mb-2" />
                <CardTitle className="text-amber-900">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Join a vibrant community of chess enthusiasts, make friends, and share your passion for the royal
                  game.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Achievements */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">Recent Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-green-200">
              <CardHeader>
                <Badge className="w-fit bg-green-100 text-green-800">Tournament</Badge>
                <CardTitle className="text-lg">Regional Championship</CardTitle>
                <CardDescription>Ahmed Benali wins first place</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-amber-200">
              <CardHeader>
                <Badge className="w-fit bg-amber-100 text-amber-800">Milestone</Badge>
                <CardTitle className="text-lg">100 Members Reached</CardTitle>
                <CardDescription>Growing chess community</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-green-200">
              <CardHeader>
                <Badge className="w-fit bg-green-100 text-green-800">Education</Badge>
                <CardTitle className="text-lg">Youth Program Launch</CardTitle>
                <CardDescription>New training initiative for kids</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Chess Community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you're a beginner or a master, there's a place for you at Noungambit Association.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/register">Become a Member</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-600"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
