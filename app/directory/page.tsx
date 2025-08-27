"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, ExternalLink, Filter, Grid, List } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const categories = [
    "All Categories",
    "DeFi",
    "NFT",
    "Wallet",
    "Exchange",
    "Infrastructure",
    "Gaming",
    "DAO",
    "Analytics",
    "Developer Tools",
  ]

  const web3Tools = [
    {
      id: "metamask",
      name: "MetaMask",
      description:
        "The leading self-custodial wallet. Interact with the Ethereum ecosystem in your browser and mobile.",
      category: "Wallet",
      rating: 4.8,
      users: "30M+",
      tags: ["Browser Extension", "Mobile", "Ethereum"],
      website: "https://metamask.io",
      featured: true,
    },
    {
      id: "uniswap",
      name: "Uniswap",
      description: "A decentralized trading protocol, governed by a global community of token holders and delegates.",
      category: "DeFi",
      rating: 4.7,
      users: "4M+",
      tags: ["DEX", "AMM", "Trading"],
      website: "https://uniswap.org",
      featured: true,
    },
    {
      id: "opensea",
      name: "OpenSea",
      description: "The largest NFT marketplace. Buy, sell, and discover exclusive digital items.",
      category: "NFT",
      rating: 4.5,
      users: "2M+",
      tags: ["Marketplace", "NFT", "Collectibles"],
      website: "https://opensea.io",
      featured: false,
    },
    {
      id: "chainlink",
      name: "Chainlink",
      description: "Decentralized oracle network providing real-world data to smart contracts.",
      category: "Infrastructure",
      rating: 4.9,
      users: "1000+",
      tags: ["Oracle", "Data", "Smart Contracts"],
      website: "https://chain.link",
      featured: true,
    },
    {
      id: "compound",
      name: "Compound",
      description: "An algorithmic, autonomous interest rate protocol built for developers.",
      category: "DeFi",
      rating: 4.6,
      users: "500K+",
      tags: ["Lending", "Interest", "Protocol"],
      website: "https://compound.finance",
      featured: false,
    },
    {
      id: "axie-infinity",
      name: "Axie Infinity",
      description: "A Pokémon-inspired digital pet universe built on the Ethereum blockchain.",
      category: "Gaming",
      rating: 4.3,
      users: "2.8M+",
      tags: ["Gaming", "NFT", "Play-to-Earn"],
      website: "https://axieinfinity.com",
      featured: false,
    },
    {
      id: "makerdao",
      name: "MakerDAO",
      description: "A decentralized organization dedicated to bringing stability to the crypto economy.",
      category: "DAO",
      rating: 4.7,
      users: "100K+",
      tags: ["DAO", "Stablecoin", "Governance"],
      website: "https://makerdao.com",
      featured: false,
    },
    {
      id: "defipulse",
      name: "DeFiPulse",
      description: "The decentralized finance leaderboard. Rankings and analytics for DeFi protocols.",
      category: "Analytics",
      rating: 4.4,
      users: "250K+",
      tags: ["Analytics", "DeFi", "Rankings"],
      website: "https://defipulse.com",
      featured: false,
    },
  ]

  const filteredTools = web3Tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const featuredTools = filteredTools.filter((tool) => tool.featured)
  const regularTools = filteredTools.filter((tool) => !tool.featured)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Web3 Tools Directory</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover the best Web3 tools, protocols, and platforms. From DeFi to NFTs, find everything you need to
              navigate the decentralized web.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tools, categories, or tags..."
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
              <div className="flex border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">Showing {filteredTools.length} tools</div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      {featuredTools.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <Badge variant="secondary">Featured</Badge>
              <h2 className="text-2xl font-bold text-foreground">Featured Tools</h2>
            </div>

            <div
              className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
            >
              {featuredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} viewMode={viewMode} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Tools */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {featuredTools.length > 0 && <h2 className="text-2xl font-bold text-foreground mb-8">All Tools</h2>}

          <div
            className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
          >
            {regularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} viewMode={viewMode} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tools found matching your criteria.</p>
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

interface ToolCardProps {
  tool: {
    id: string
    name: string
    description: string
    category: string
    rating: number
    users: string
    tags: string[]
    website: string
    featured: boolean
  }
  viewMode: "grid" | "list"
}

function ToolCard({ tool, viewMode }: ToolCardProps) {
  return (
    <Link href={`/directory/${tool.id}`} className="block">
      <Card
        className={`hover:shadow-lg transition-all duration-200 cursor-pointer group ${viewMode === "list" ? "flex-row" : ""}`}
      >
        <CardHeader className={viewMode === "list" ? "flex-1" : ""}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {tool.category}
                </Badge>
                {tool.featured && (
                  <Badge variant="secondary" className="text-xs">
                    Featured
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">{tool.name}</CardTitle>
              <CardDescription className="mt-2 line-clamp-2">{tool.description}</CardDescription>
            </div>
            <div className="flex items-center text-sm text-muted-foreground ml-4">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              {tool.rating}
            </div>
          </div>
        </CardHeader>
        <CardContent className={viewMode === "list" ? "flex items-center" : ""}>
          <div className={`${viewMode === "list" ? "flex items-center gap-4" : "space-y-4"}`}>
            <div className="flex flex-wrap gap-1">
              {tool.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className={`flex items-center justify-between ${viewMode === "list" ? "ml-auto" : ""}`}>
              <span className="text-sm text-muted-foreground">{tool.users} users</span>
              <Button
                variant="ghost"
                size="sm"
                className="group-hover:bg-primary/10"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  window.open(tool.website, "_blank", "noopener,noreferrer")
                }}
              >
                Visit
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
