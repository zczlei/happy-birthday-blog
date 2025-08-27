"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Search, Play, BookOpen, Clock, Users, Star, Filter, GraduationCap } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]
  const categories = ["All Categories", "Blockchain Basics", "DeFi", "NFTs", "Smart Contracts", "Trading", "Security"]

  const learningPaths = [
    {
      id: 1,
      title: "Web3 Fundamentals",
      description: "Complete introduction to blockchain and Web3 technologies",
      level: "Beginner",
      duration: "6 weeks",
      lessons: 24,
      students: 15420,
      rating: 4.8,
      progress: 0,
      image: "/learn-web3-fundamentals.jpg",
      topics: ["Blockchain Basics", "Wallets", "Transactions", "Consensus"],
    },
    {
      id: 2,
      title: "DeFi Mastery Course",
      description: "Deep dive into decentralized finance protocols and strategies",
      level: "Intermediate",
      duration: "8 weeks",
      lessons: 32,
      students: 8750,
      rating: 4.9,
      progress: 25,
      image: "/learn-defi-mastery.jpg",
      topics: ["Lending", "DEXs", "Yield Farming", "Liquidity Mining"],
    },
    {
      id: 3,
      title: "Smart Contract Development",
      description: "Learn to build and deploy smart contracts on Ethereum",
      level: "Advanced",
      duration: "12 weeks",
      lessons: 48,
      students: 5230,
      rating: 4.7,
      progress: 60,
      image: "/learn-smart-contracts.jpg",
      topics: ["Solidity", "Testing", "Security", "Deployment"],
    },
  ]

  const articles = [
    {
      id: 1,
      title: "What is Blockchain? A Complete Beginner's Guide",
      description: "Understanding the fundamentals of blockchain technology and its applications",
      category: "Blockchain Basics",
      level: "Beginner",
      readTime: "8 min read",
      author: "Sarah Chen",
      image: "/article-blockchain-basics.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "How to Set Up Your First Crypto Wallet",
      description: "Step-by-step guide to creating and securing your cryptocurrency wallet",
      category: "Security",
      level: "Beginner",
      readTime: "6 min read",
      author: "Mike Johnson",
      image: "/article-crypto-wallet.jpg",
      featured: false,
    },
    {
      id: 3,
      title: "Understanding DeFi Protocols: Uniswap Deep Dive",
      description: "Comprehensive analysis of how Uniswap works and how to use it effectively",
      category: "DeFi",
      level: "Intermediate",
      readTime: "12 min read",
      author: "Alex Rodriguez",
      image: "/article-uniswap-guide.jpg",
      featured: true,
    },
    {
      id: 4,
      title: "NFT Trading Strategies for Beginners",
      description: "Learn the basics of NFT trading, from research to execution",
      category: "NFTs",
      level: "Beginner",
      readTime: "10 min read",
      author: "Emma Wilson",
      image: "/article-nft-trading.jpg",
      featured: false,
    },
  ]

  const videos = [
    {
      id: 1,
      title: "Blockchain Explained in 10 Minutes",
      description: "Quick overview of blockchain technology and its key concepts",
      category: "Blockchain Basics",
      level: "Beginner",
      duration: "10:24",
      views: 125000,
      instructor: "David Park",
      thumbnail: "/video-blockchain-explained.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "How to Use MetaMask: Complete Tutorial",
      description: "Step-by-step guide to setting up and using the MetaMask wallet",
      category: "Security",
      level: "Beginner",
      duration: "15:32",
      views: 89000,
      instructor: "Lisa Chang",
      thumbnail: "/video-metamask-tutorial.jpg",
      featured: false,
    },
    {
      id: 3,
      title: "DeFi Yield Farming Strategies",
      description: "Advanced strategies for maximizing returns in DeFi protocols",
      category: "DeFi",
      level: "Advanced",
      duration: "22:18",
      views: 67000,
      instructor: "Michael Torres",
      thumbnail: "/video-yield-farming.jpg",
      featured: true,
    },
    {
      id: 4,
      title: "Smart Contract Security Best Practices",
      description: "Essential security considerations when developing smart contracts",
      category: "Smart Contracts",
      level: "Advanced",
      duration: "18:45",
      views: 45000,
      instructor: "Sarah Kim",
      thumbnail: "/video-smart-contract-security.jpg",
      featured: false,
    },
  ]

  const filteredContent = (content: any[]) => {
    return content.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesLevel = selectedLevel === "all" || item.level === selectedLevel
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

      return matchesSearch && matchesLevel && matchesCategory
    })
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
    return views.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Web3 Learning Hub</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Master Web3 technologies with our comprehensive courses, tutorials, and expert-led content. From
              blockchain basics to advanced DeFi strategies.
            </p>
          </div>

          {/* Learning Paths */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="secondary">
                <GraduationCap className="h-3 w-3 mr-1" />
                Learning Paths
              </Badge>
              <h2 className="text-xl font-bold text-foreground">Structured Courses</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <Link key={path.id} href={`/learn/${path.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <img
                        src={path.image || "/placeholder.svg?height=200&width=400"}
                        alt={path.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{path.level}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {path.rating}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                      <CardDescription>{path.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {path.progress > 0 && (
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{path.progress}%</span>
                            </div>
                            <Progress value={path.progress} className="h-2" />
                          </div>
                        )}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {path.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {path.lessons} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {formatViews(path.students)}
                          </span>
                        </div>
                        <Button className="w-full" variant={path.progress > 0 ? "default" : "outline"}>
                          {path.progress > 0 ? "Continue Learning" : "Start Course"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search learning content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {levels.slice(1).map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Videos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent(articles).map((article) => (
                  <Link key={article.id} href={`/learn/${article.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                        <img
                          src={article.image || "/placeholder.svg?height=200&width=400"}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{article.category}</Badge>
                          <Badge
                            variant={
                              article.level === "Beginner"
                                ? "secondary"
                                : article.level === "Intermediate"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {article.level}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{article.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>By {article.author}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent(videos).map((video) => (
                  <Link key={video.id} href={`/learn/${video.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden relative">
                        <img
                          src={video.thumbnail || "/placeholder.svg?height=200&width=400"}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-primary rounded-full p-3">
                            <Play className="h-6 w-6 text-primary-foreground fill-current" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{video.category}</Badge>
                          <Badge
                            variant={
                              video.level === "Beginner"
                                ? "secondary"
                                : video.level === "Intermediate"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {video.level}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>By {video.instructor}</span>
                          <span>{formatViews(video.views)} views</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredContent(articles).length === 0 && filteredContent(videos).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No learning content found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedLevel("all")
                  setSelectedCategory("all")
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
