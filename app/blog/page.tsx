"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, User, Calendar, Tag } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("all")
  const [sortBy, setSortBy] = useState("latest")

  const tags = ["All", "Tutorial", "Analysis", "Guide", "Opinion", "Technical", "Market", "Beginner"]

  const blogPosts = [
    {
      id: 1,
      title: "Complete Guide to DeFi Yield Farming: Strategies and Risks",
      excerpt:
        "Learn everything you need to know about yield farming in DeFi, including the best strategies, risk management, and platform comparisons.",
      content: "Full article content would go here...",
      tags: ["Tutorial", "DeFi", "Guide"],
      author: "Alex Chen",
      publishedAt: "2024-01-15T14:30:00Z",
      readTime: "12 min read",
      image: "/blog-defi-yield-farming.png",
      featured: true,
      views: 2847,
    },
    {
      id: 2,
      title: "Understanding Smart Contract Security: Common Vulnerabilities",
      excerpt:
        "Explore the most common smart contract vulnerabilities and learn how to identify and prevent security issues in your blockchain applications.",
      content: "Full article content would go here...",
      tags: ["Technical", "Security", "Tutorial"],
      author: "Sarah Kim",
      publishedAt: "2024-01-14T10:15:00Z",
      readTime: "15 min read",
      image: "/blog-smart-contract-security.png",
      featured: false,
      views: 1923,
    },
    {
      id: 3,
      title: "NFT Market Analysis: Trends and Future Predictions",
      excerpt:
        "Deep dive into current NFT market trends, analyzing trading volumes, popular collections, and what the future holds for digital collectibles.",
      content: "Full article content would go here...",
      tags: ["Analysis", "NFT", "Market"],
      author: "Michael Torres",
      publishedAt: "2024-01-13T16:45:00Z",
      readTime: "8 min read",
      image: "/blog-nft-market-analysis.png",
      featured: true,
      views: 3156,
    },
    {
      id: 4,
      title: "Getting Started with Web3 Development: A Beginner's Roadmap",
      excerpt:
        "Your complete roadmap to becoming a Web3 developer, covering essential tools, frameworks, and learning resources.",
      content: "Full article content would go here...",
      tags: ["Beginner", "Tutorial", "Development"],
      author: "Emma Rodriguez",
      publishedAt: "2024-01-12T09:30:00Z",
      readTime: "10 min read",
      image: "/blog-web3-development.png",
      featured: false,
      views: 4521,
    },
    {
      id: 5,
      title: "The Future of Decentralized Autonomous Organizations (DAOs)",
      excerpt:
        "Examining the evolution of DAOs, their current challenges, and the potential impact on traditional organizational structures.",
      content: "Full article content would go here...",
      tags: ["Opinion", "DAO", "Analysis"],
      author: "David Park",
      publishedAt: "2024-01-11T13:20:00Z",
      readTime: "7 min read",
      image: "/blog-dao-future.png",
      featured: false,
      views: 1876,
    },
    {
      id: 6,
      title: "Layer 2 Solutions Comparison: Optimism vs Arbitrum vs Polygon",
      excerpt:
        "Comprehensive comparison of popular Layer 2 scaling solutions, analyzing their features, performance, and ecosystem development.",
      content: "Full article content would go here...",
      tags: ["Technical", "Analysis", "Guide"],
      author: "Lisa Wang",
      publishedAt: "2024-01-10T11:45:00Z",
      readTime: "14 min read",
      image: "/blog-layer2-comparison.png",
      featured: true,
      views: 2634,
    },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag)

    return matchesSearch && matchesTag
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      case "popular":
        return b.views - a.views
      case "featured":
        return b.featured === a.featured ? 0 : b.featured ? 1 : -1
      default:
        return 0
    }
  })

  const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Web3 Blog & Insights</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              In-depth articles, tutorials, and analysis from Web3 experts. Learn, explore, and stay ahead in the
              decentralized world.
            </p>
          </div>

          {/* Featured Posts */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="secondary">Featured</Badge>
              <h2 className="text-xl font-bold text-foreground">Editor's Picks</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <Card
                    className={`hover:shadow-lg transition-shadow cursor-pointer ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                  >
                    <div
                      className={`aspect-video bg-muted rounded-t-lg overflow-hidden ${index === 0 ? "lg:aspect-[2/1]" : ""}`}
                    >
                      <img
                        src={post.image || "/placeholder.svg?height=300&width=600"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className={`line-clamp-2 ${index === 0 ? "text-2xl" : "text-lg"}`}>
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.publishedAt)}
                        </span>
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
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-full md:w-48">
                  <Tag className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {tags.slice(1).map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">Showing {sortedPosts.length} articles</div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sortedPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg?height=200&width=400"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {post.featured && (
                        <Badge variant="secondary" className="text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>{post.views.toLocaleString()} views</span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {sortedPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedTag("all")
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
