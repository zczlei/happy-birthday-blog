"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, ExternalLink, TrendingUp, Filter, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface NewsArticle {
  id: string
  title: string
  body: string
  url: string
  source_info: {
    name: string
  }
  published_on: number
  imageurl?: string
  categories: string
  tags: string
}

interface ApiResponse {
  Data: NewsArticle[]
  HasWarning: boolean
  Message: string
}

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("latest")
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories = ["All", "DeFi", "NFT", "Bitcoin", "Ethereum", "Regulation", "Adoption", "Technology"]

  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        "https://min-api.cryptocompare.com/data/v2/news/?excludedCategories=Sponsored&feeds=cointelegraph%2Ctheblock%2Cdecrypt&extraParams=Blocksdecoded",
      )

      if (!response.ok) {
        throw new Error("Failed to fetch news")
      }

      const data: ApiResponse = await response.json()

      if (data.Data && Array.isArray(data.Data)) {
        setNewsArticles(data.Data)
      } else {
        throw new Error("Invalid data format")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch news")
      console.error("Error fetching news:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const getImageUrl = (imageurl?: string): string => {
    if (!imageurl || imageurl.trim() === "") {
      return "/crypto-news-collage.png"
    }

    // If imageurl already starts with http, use it directly
    if (imageurl.startsWith("http")) {
      return imageurl
    }

    // Otherwise, prepend the CryptoCompare domain
    return `https://www.cryptocompare.com${imageurl}`
  }

  const getCategoryFromTags = (tags: string, categories: string): string => {
    const tagList = tags.toLowerCase()
    const categoryList = categories.toLowerCase()

    if (tagList.includes("bitcoin") || categoryList.includes("bitcoin")) return "Bitcoin"
    if (tagList.includes("ethereum") || categoryList.includes("ethereum")) return "Ethereum"
    if (tagList.includes("defi") || categoryList.includes("defi")) return "DeFi"
    if (tagList.includes("nft") || categoryList.includes("nft")) return "NFT"
    if (tagList.includes("regulation") || categoryList.includes("regulation")) return "Regulation"
    if (tagList.includes("adoption") || categoryList.includes("adoption")) return "Adoption"
    return "Technology"
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "1 day ago"
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  const getReadTime = (body: string): string => {
    const wordsPerMinute = 200
    const wordCount = body.split(" ").length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} min read`
  }

  const filteredArticles = newsArticles.filter((article) => {
    const category = getCategoryFromTags(article.tags || "", article.categories || "")

    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return b.published_on - a.published_on
      case "trending":
        // For trending, we'll use recent articles with more engagement (approximated by title length)
        const aScore = (Date.now() / 1000 - a.published_on) / 3600 + a.title.length
        const bScore = (Date.now() / 1000 - b.published_on) / 3600 + b.title.length
        return bScore - aScore
      default:
        return 0
    }
  })

  const trendingArticles = sortedArticles.slice(0, 3)

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading latest news...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error loading news: {error}</p>
            <Button onClick={fetchNews}>Try Again</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Web3 News & Updates</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Stay informed with the latest developments in blockchain, cryptocurrency, and decentralized technologies.
            </p>
          </div>

          {/* Trending News */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="secondary">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
              <h2 className="text-xl font-bold text-foreground">Hot Topics</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingArticles.map((article) => (
                <Link key={article.id} href={`/news/${article.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <Image
                        src={getImageUrl(article.imageurl) || "/placeholder.svg"}
                        alt={article.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/crypto-news-collage.png"
                        }}
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">
                          {getCategoryFromTags(article.tags || "", article.categories || "")}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{formatDate(article.published_on)}</span>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {article.body.substring(0, 150)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{getReadTime(article.body)}</span>
                        <Button variant="ghost" size="sm">
                          Read More
                          <ExternalLink className="ml-1 h-3 w-3" />
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
                  placeholder="Search news articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
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
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">Showing {sortedArticles.length} articles</div>
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sortedArticles.map((article) => (
              <Link key={article.id} href={`/news/${article.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="aspect-video md:aspect-square bg-muted rounded-l-lg overflow-hidden">
                        <Image
                          src={getImageUrl(article.imageurl) || "/placeholder.svg"}
                          alt={article.title}
                          width={300}
                          height={200}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/crypto-news-collage.png"
                          }}
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {getCategoryFromTags(article.tags || "", article.categories || "")}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{formatDate(article.published_on)}</span>
                        </div>
                        <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                        <CardDescription className="line-clamp-3">{article.body.substring(0, 200)}...</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>By {article.source_info.name}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {getReadTime(article.body)}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">
                            Read More
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {sortedArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
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
