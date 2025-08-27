"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Clock, Users, Star, BookOpen, Video, CheckCircle, Lock } from "lucide-react"
import Image from "next/image"

interface LearningPath {
  id: number
  title: string
  description: string
  fullDescription: string
  level: string
  duration: string
  lessons: number
  students: number
  rating: number
  progress: number
  image: string
  topics: string[]
  instructor: string
  price: string
  curriculum: Lesson[]
  requirements: string[]
  whatYouLearn: string[]
}

interface Lesson {
  id: number
  title: string
  type: "video" | "article" | "quiz"
  duration: string
  completed: boolean
  locked: boolean
}

// Mock data for learning paths
const getLearningPathById = (id: string): LearningPath | null => {
  const paths: Record<string, LearningPath> = {
    "1": {
      id: 1,
      title: "Web3 Fundamentals",
      description: "Complete introduction to blockchain and Web3 technologies",
      fullDescription:
        "This comprehensive course provides a solid foundation in Web3 technologies, covering blockchain fundamentals, cryptocurrencies, smart contracts, and decentralized applications. Perfect for beginners looking to enter the Web3 space.",
      level: "Beginner",
      duration: "8 weeks",
      lessons: 24,
      students: 15420,
      rating: 4.8,
      progress: 0,
      image: "/learn-web3-fundamentals.png",
      topics: ["Blockchain", "Cryptocurrency", "Smart Contracts", "DApps"],
      instructor: "Dr. Emily Chen",
      price: "Free",
      curriculum: [
        {
          id: 1,
          title: "Introduction to Blockchain",
          type: "video",
          duration: "15 min",
          completed: false,
          locked: false,
        },
        { id: 2, title: "How Bitcoin Works", type: "video", duration: "20 min", completed: false, locked: false },
        {
          id: 3,
          title: "Understanding Ethereum",
          type: "article",
          duration: "10 min",
          completed: false,
          locked: false,
        },
        { id: 4, title: "Quiz: Blockchain Basics", type: "quiz", duration: "5 min", completed: false, locked: true },
        {
          id: 5,
          title: "Smart Contracts Explained",
          type: "video",
          duration: "25 min",
          completed: false,
          locked: true,
        },
        { id: 6, title: "Building Your First DApp", type: "video", duration: "30 min", completed: false, locked: true },
        { id: 7, title: "DeFi Fundamentals", type: "article", duration: "15 min", completed: false, locked: true },
        {
          id: 8,
          title: "NFTs and Digital Ownership",
          type: "video",
          duration: "18 min",
          completed: false,
          locked: true,
        },
      ],
      requirements: [
        "Basic computer literacy",
        "Interest in blockchain technology",
        "No prior programming experience required",
      ],
      whatYouLearn: [
        "Understand blockchain technology and its applications",
        "Learn about different types of cryptocurrencies",
        "Explore smart contracts and their use cases",
        "Discover decentralized applications (DApps)",
        "Get familiar with DeFi and NFT ecosystems",
        "Understand Web3 wallets and security best practices",
      ],
    },
    "2": {
      id: 2,
      title: "DeFi Mastery Course",
      description: "Advanced strategies for decentralized finance",
      fullDescription:
        "Master the world of decentralized finance with this advanced course covering yield farming, liquidity provision, governance, and risk management strategies.",
      level: "Advanced",
      duration: "12 weeks",
      lessons: 36,
      students: 8930,
      rating: 4.9,
      progress: 0,
      image: "/learn-defi-mastery.png",
      topics: ["DeFi", "Yield Farming", "Liquidity", "Governance"],
      instructor: "Michael Rodriguez",
      price: "$199",
      curriculum: [
        { id: 1, title: "DeFi Landscape Overview", type: "video", duration: "20 min", completed: false, locked: false },
        { id: 2, title: "Automated Market Makers", type: "video", duration: "25 min", completed: false, locked: false },
        {
          id: 3,
          title: "Yield Farming Strategies",
          type: "article",
          duration: "15 min",
          completed: false,
          locked: true,
        },
        {
          id: 4,
          title: "Impermanent Loss Deep Dive",
          type: "video",
          duration: "30 min",
          completed: false,
          locked: true,
        },
        {
          id: 5,
          title: "Advanced Trading Strategies",
          type: "video",
          duration: "35 min",
          completed: false,
          locked: true,
        },
      ],
      requirements: [
        "Basic understanding of blockchain",
        "Experience with cryptocurrency wallets",
        "Familiarity with DeFi concepts",
      ],
      whatYouLearn: [
        "Master advanced DeFi strategies",
        "Understand yield farming and liquidity mining",
        "Learn risk management techniques",
        "Explore governance and DAO participation",
        "Analyze DeFi protocols and tokenomics",
      ],
    },
  }

  return paths[id] || null
}

const relatedCourses = [
  {
    id: 3,
    title: "Smart Contract Development",
    level: "Intermediate",
    rating: 4.7,
    students: 5420,
    image: "/learn-smart-contracts.png",
  },
  {
    id: 4,
    title: "NFT Creation Workshop",
    level: "Beginner",
    rating: 4.6,
    students: 3210,
    image: "/learn-nft-workshop.png",
  },
  { id: 5, title: "Blockchain Security", level: "Advanced", rating: 4.8, students: 2180, image: "/learn-security.png" },
]

export default function LearnDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<LearningPath | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    const courseData = getLearningPathById(params.id as string)
    setCourse(courseData)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning
          </Button>
        </div>

        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">{course.level}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">({course.students.toLocaleString()} students)</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-4 text-balance">{course.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{course.description}</p>

              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {course.topics.map((topic) => (
                <Badge key={topic} variant="outline">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Course Preview */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={400}
                    height={225}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                    <Button size="lg" className="rounded-full">
                      <Play className="h-6 w-6 mr-2" />
                      Preview Course
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold">{course.price}</div>
                    {course.price !== "Free" && <div className="text-sm text-muted-foreground">One-time payment</div>}
                  </div>
                  <Button className="w-full" size="lg" onClick={() => setEnrolled(!enrolled)}>
                    {enrolled ? "Continue Learning" : course.price === "Free" ? "Enroll for Free" : "Enroll Now"}
                  </Button>
                  {enrolled && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{course.instructor}</h4>
                    <p className="text-sm text-muted-foreground">Blockchain Expert</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About This Course</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{course.fullDescription}</p>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.whatYouLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Curriculum */}
            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
                <CardDescription>
                  {course.lessons} lessons • {course.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.curriculum.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border ${lesson.locked ? "opacity-50" : "hover:bg-accent cursor-pointer"}`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                          {lesson.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : lesson.locked ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          ) : lesson.type === "video" ? (
                            <Video className="h-4 w-4 text-primary" />
                          ) : lesson.type === "article" ? (
                            <BookOpen className="h-4 w-4 text-primary" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{lesson.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs capitalize">
                              {lesson.type}
                            </Badge>
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                      {!lesson.locked && (
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Related Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Related Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedCourses.map((related) => (
                    <div key={related.id} className="group cursor-pointer">
                      <div className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={related.image || "/placeholder.svg"}
                            alt={related.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {related.level}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{related.rating}</span>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {related.students.toLocaleString()} students
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Course Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Students</span>
                  <span className="font-medium">{course.students.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level</span>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
