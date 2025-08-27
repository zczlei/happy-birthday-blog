"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, User, Eye, Share2, Bookmark, ThumbsUp } from "lucide-react"
import Image from "next/image"

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  publishedAt: string
  readTime: string
  image: string
  trending: boolean
  source: string
  tags: string[]
  views: number
  likes: number
  url?: string
}

const getNewsById = async (id: string): Promise<NewsArticle | null> => {
  try {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/v2/news/?excludedCategories=Sponsored&feeds=cointelegraph%2Ctheblock%2Cdecrypt&extraParams=Blocksdecoded`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch news")
    }

    const data = await response.json()
    const article = data.Data?.find((item: any) => item.id === id)

    if (!article) {
      return null
    }

    // Transform API data to our interface
    return {
      id: article.id,
      title: article.title,
      excerpt: article.body?.substring(0, 200) + "..." || "",
      content: `<p>${article.body || "Content not available."}</p>`,
      category: article.categories?.split("|")[0] || "Technology",
      author: article.source_info?.name || "Unknown Author",
      publishedAt: new Date(article.published_on * 1000).toLocaleDateString(),
      readTime: `${Math.ceil((article.body?.length || 0) / 200)} min read`,
      image: article.imageurl ? `https://www.cryptocompare.com${article.imageurl}` : "/crypto-news-collage.png",
      trending: false,
      source: article.source_info?.name || "CryptoCompare",
      tags: article.tags?.split("|").slice(0, 4) || ["Crypto"],
      views: Math.floor(Math.random() * 10000) + 1000,
      likes: Math.floor(Math.random() * 500) + 50,
      url: article.url,
    }
  } catch (error) {
    console.error("Error fetching news article:", error)
    return null
  }
}

const relatedArticles = [
  {
    id: 3,
    title: "DeFi Protocol Launches Cross-Chain Bridge",
    category: "DeFi",
    readTime: "3 min",
    image: "/news-defi-bridge.png",
  },
  {
    id: 4,
    title: "NFT Marketplace Introduces Creator Royalties",
    category: "NFTs",
    readTime: "4 min",
    image: "/news-nft-royalties.png",
  },
  {
    id: 5,
    title: "Layer 2 Solutions See Record Adoption",
    category: "Technology",
    readTime: "5 min",
    image: "/news-layer2.png",
  },
]

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true)
      const articleData = await getNewsById(params.id as string)
      setArticle(articleData)
      setLoading(false)
    }

    fetchArticle()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Button>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{article.category}</Badge>
            {article.trending && <Badge variant="destructive">Trending</Badge>}
          </div>

          <h1 className="text-4xl font-bold mb-4 text-balance">{article.title}</h1>

          <div className="flex items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{article.views.toLocaleString()} views</span>
            </div>
            <span>{article.publishedAt}</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <Button variant="outline" size="sm" onClick={() => setLiked(!liked)}>
              <ThumbsUp className={`h-4 w-4 mr-2 ${liked ? "fill-blue-500 text-blue-500" : ""}`} />
              {liked ? article.likes + 1 : article.likes}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setBookmarked(!bookmarked)}>
              <Bookmark className={`h-4 w-4 mr-2 ${bookmarked ? "fill-yellow-500 text-yellow-500" : ""}`} />
              {bookmarked ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            {article.url && (
              <Button variant="outline" size="sm" asChild>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read Original
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 rounded-xl overflow-hidden">
          <Image
            src={article.image || "/crypto-news-collage.png"}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/crypto-news-collage.png"
            }}
          />
        </div>

        {/* Article Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Info */}
            <div className="mt-8 p-6 bg-card rounded-lg border">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{article.author}</h4>
                  <p className="text-muted-foreground">Senior Crypto Journalist at {article.source}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Covering blockchain technology and cryptocurrency markets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Articles */}
            <Card>
              <CardHeader>
                <CardTitle>Related Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedArticles.map((related) => (
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
                              {related.category}
                            </Badge>
                            <span>{related.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
                <CardDescription>Get the latest crypto news delivered to your inbox</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  />
                  <Button className="w-full" size="sm">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
