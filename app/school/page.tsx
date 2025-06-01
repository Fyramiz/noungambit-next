"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, Users, BookOpen, Award, Star, Clock, Target, TrendingUp, Play } from "lucide-react"

// Mock data for coaches
const coaches = [
  {
    id: 1,
    name: "Master Ahmed Benali",
    nameAr: "الأستاذ أحمد بن علي",
    title: "Head Coach",
    rating: 2150,
    experience: "15+ years",
    specialization: "Tournament Preparation",
    students: 25,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Coach Fatima Zahra",
    nameAr: "المدربة فاطمة الزهراء",
    title: "Junior Coach",
    rating: 2089,
    experience: "8 years",
    specialization: "Beginner & Youth Training",
    students: 30,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Coach Youssef Alami",
    nameAr: "المدرب يوسف العلمي",
    title: "Strategy Coach",
    rating: 2045,
    experience: "12 years",
    specialization: "Advanced Strategy & Tactics",
    students: 18,
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

// Mock data for courses
const courses = [
  {
    id: 1,
    title: "Chess Fundamentals",
    titleAr: "أساسيات الشطرنج",
    level: "Beginner",
    duration: "8 weeks",
    students: 45,
    rating: 4.8,
    price: "500 MAD",
    description: "Learn the basic rules, piece movements, and fundamental strategies",
    topics: ["Basic Rules", "Piece Values", "Opening Principles", "Basic Tactics"],
  },
  {
    id: 2,
    title: "Tactical Mastery",
    titleAr: "إتقان التكتيكات",
    level: "Intermediate",
    duration: "10 weeks",
    students: 32,
    rating: 4.9,
    price: "750 MAD",
    description: "Master chess tactics and improve your calculation skills",
    topics: ["Pin & Fork", "Skewer & Discovery", "Combination Play", "Calculation"],
  },
  {
    id: 3,
    title: "Endgame Excellence",
    titleAr: "تميز النهايات",
    level: "Advanced",
    duration: "12 weeks",
    students: 18,
    rating: 4.7,
    price: "900 MAD",
    description: "Master essential endgames and theoretical positions",
    topics: ["King & Pawn", "Rook Endgames", "Minor Piece Endings", "Complex Endings"],
  },
]

// Mock data for students
const topStudents = [
  {
    id: 1,
    name: "Omar Tazi",
    nameAr: "عمر التازي",
    age: 16,
    level: "Intermediate",
    progress: 85,
    achievements: 12,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Salma Idrissi",
    nameAr: "سلمى الإدريسي",
    age: 15,
    level: "Beginner",
    progress: 92,
    achievements: 8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Anas Berrada",
    nameAr: "أنس برادة",
    age: 14,
    level: "Intermediate",
    progress: 78,
    achievements: 15,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function SchoolPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Chess School</h1>
          <p className="text-lg text-green-700">مدرسة الشطرنج</p>
          <p className="text-gray-600 mt-2">Professional chess education for all skill levels</p>
        </div>

        {/* School Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-amber-600" />
                <span className="text-2xl font-bold text-amber-900">95</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-800">12</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Certified Coaches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-amber-600" />
                <span className="text-2xl font-bold text-amber-900">8</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-800">94%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coaches Section */}
        <Card className="mb-8 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <GraduationCap className="h-6 w-6" />
              Our Coaches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coaches.map((coach) => (
                <Card key={coach.id} className="border-green-200">
                  <CardHeader className="text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-2">
                      <AvatarImage src={coach.avatar || "/placeholder.svg"} alt={coach.name} />
                      <AvatarFallback>
                        {coach.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{coach.name}</CardTitle>
                    <p className="text-sm text-gray-600">{coach.nameAr}</p>
                    <Badge className="bg-amber-100 text-amber-800">{coach.title}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-semibold">{coach.rating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-semibold">{coach.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-semibold">{coach.students}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-gray-600 text-xs">Specialization:</span>
                      <p className="text-sm font-medium">{coach.specialization}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Courses Section */}
        <Card className="mb-8 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <BookOpen className="h-6 w-6" />
              Available Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="border-amber-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <p className="text-sm text-gray-600">{course.titleAr}</p>
                      </div>
                      <Badge
                        variant={
                          course.level === "Beginner"
                            ? "secondary"
                            : course.level === "Intermediate"
                              ? "default"
                              : "destructive"
                        }
                      >
                        {course.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-700">{course.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{course.rating}/5.0</span>
                      </div>
                      <div className="font-semibold text-green-600">{course.price}</div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Course Topics:</h4>
                      <div className="flex flex-wrap gap-1">
                        {course.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
                      <Play className="h-4 w-4 mr-2" />
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Students */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Award className="h-6 w-6" />
                Top Performing Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topStudents.map((student, index) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold text-gray-500">#{index + 1}</div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.nameAr}</p>
                        <Badge variant="outline" className="text-xs">
                          {student.level} • Age {student.age}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Progress</div>
                      <div className="font-semibold">{student.progress}%</div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Award className="h-3 w-3" />
                        {student.achievements} badges
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <Target className="h-6 w-6" />
                Learning Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-2">Chess Tactics Trainer</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Practice tactical puzzles daily to improve your pattern recognition
                </p>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                  Start Training
                </Button>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Opening Database</h4>
                <p className="text-sm text-gray-700 mb-3">Study popular openings and build your repertoire</p>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Explore Openings
                </Button>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Game Analysis</h4>
                <p className="text-sm text-gray-700 mb-3">Analyze your games with our AI-powered engine</p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Analyze Games
                </Button>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">Video Lessons</h4>
                <p className="text-sm text-gray-700 mb-3">Watch instructional videos from our expert coaches</p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Watch Videos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
