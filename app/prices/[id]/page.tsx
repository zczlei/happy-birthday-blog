"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Star, ExternalLink, Globe, Twitter, MessageCircle } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

// Mock function to get crypto data by ID
function getCryptoById(id: string) {
  const cryptoData = {
    bitcoin: {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      price: 97850.32,
      change24h: 2.45,
      change7d: -1.23,
      change30d: 15.67,
      marketCap: 1940000000000,
      volume24h: 28500000000,
      circulatingSupply: 19800000,
      totalSupply: 21000000,
      maxSupply: 21000000,
      rank: 1,
      image: "/bitcoin-logo.png",
      description:
        "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency.",
      website: "https://bitcoin.org",
      whitepaper: "https://bitcoin.org/bitcoin.pdf",
      explorer: "https://blockchair.com/bitcoin",
      github: "https://github.com/bitcoin/bitcoin",
      twitter: "https://twitter.com/bitcoin",
      reddit: "https://reddit.com/r/bitcoin",
      allTimeHigh: 108135.0,
      allTimeLow: 0.0495,
      tags: ["Cryptocurrency", "Store of Value", "Digital Gold", "Proof of Work"],
    },
    ethereum: {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      price: 3420.89,
      change24h: 3.78,
      change7d: 5.67,
      change30d: 22.34,
      marketCap: 411200000000,
      volume24h: 15200000000,
      circulatingSupply: 120280000,
      totalSupply: 120280000,
      maxSupply: null,
      rank: 2,
      image: "/ethereum-logo.png",
      description:
        "Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference.",
      website: "https://ethereum.org",
      whitepaper: "https://ethereum.org/whitepaper/",
      explorer: "https://etherscan.io",
      github: "https://github.com/ethereum/go-ethereum",
      twitter: "https://twitter.com/ethereum",
      reddit: "https://reddit.com/r/ethereum",
      allTimeHigh: 4891.7,
      allTimeLow: 0.432979,
      tags: ["Smart Contracts", "DeFi", "NFTs", "Proof of Stake"],
    },
    // Add more cryptocurrencies as needed
  }

  return cryptoData[id as keyof typeof cryptoData] || null
}

export default function CryptoDetailPage({ params }: { params: { id: string } }) {
  const [timeframe, setTimeframe] = useState("24h")
  const [isWatchlisted, setIsWatchlisted] = useState(false)

  const crypto = getCryptoById(params.id)

  if (!crypto) {
    notFound()
  }

  const formatPrice = (price: number) => {
    if (price < 1) {
      return `$${price.toFixed(6)}`
    }
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`
    }
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`
    }
    return `$${(marketCap / 1e6).toFixed(2)}M`
  }

  const formatSupply = (supply: number) => {
    if (supply >= 1e9) {
      return `${(supply / 1e9).toFixed(2)}B`
    }
    if (supply >= 1e6) {
      return `${(supply / 1e6).toFixed(2)}M`
    }
    return supply.toLocaleString()
  }

  const generatePriceData = (timeframe: string) => {
    const data = []
    const basePrice = crypto.price
    let dataPoints = 24
    let timeInterval = 60 * 60 * 1000 // 1 hour

    switch (timeframe) {
      case "1h":
        dataPoints = 60
        timeInterval = 60 * 1000 // 1 minute
        break
      case "24h":
        dataPoints = 24
        timeInterval = 60 * 60 * 1000 // 1 hour
        break
      case "7d":
        dataPoints = 7
        timeInterval = 24 * 60 * 60 * 1000 // 1 day
        break
      case "30d":
        dataPoints = 30
        timeInterval = 24 * 60 * 60 * 1000 // 1 day
        break
      case "1y":
        dataPoints = 12
        timeInterval = 30 * 24 * 60 * 60 * 1000 // 1 month
        break
    }

    for (let i = 0; i < dataPoints; i++) {
      const timestamp = Date.now() - (dataPoints - 1 - i) * timeInterval
      const volatility = timeframe === "1h" ? 0.02 : timeframe === "24h" ? 0.05 : 0.1
      const trend = crypto.change24h > 0 ? 0.001 : -0.001
      const randomChange = (Math.random() - 0.5) * volatility + trend * i

      data.push({
        time: timestamp,
        price: basePrice * (1 + randomChange),
        formattedTime: new Date(timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          ...(timeframe === "7d" || timeframe === "30d" || timeframe === "1y"
            ? {
                month: "short",
                day: "numeric",
              }
            : {}),
        }),
      })
    }
    return data
  }

  const priceData = generatePriceData(timeframe)
  const referencePrice = priceData.length > 0 ? priceData[0].price : crypto.price

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="text-sm text-gray-600">{payload[0].payload.formattedTime}</p>
          <p className="text-lg font-semibold text-gray-900">{formatPrice(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/prices" className="hover:text-foreground">
              Cryptocurrencies
            </Link>
            <span>/</span>
            <span>{crypto.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src={crypto.image || "/placeholder.svg"} alt={crypto.name} className="w-12 h-12 rounded-full" />
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{crypto.name}</h1>
                  <Badge variant="secondary">{crypto.symbol}</Badge>
                  <Badge variant="outline">Rank #{crypto.rank}</Badge>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  {crypto.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={isWatchlisted ? "default" : "outline"}
                onClick={() => setIsWatchlisted(!isWatchlisted)}
                className="flex items-center gap-2"
              >
                <Star className={`h-4 w-4 ${isWatchlisted ? "fill-current" : ""}`} />
                {isWatchlisted ? "Watchlisted" : "Add to Watchlist"}
              </Button>
              <Button variant="outline" asChild>
                <a href={crypto.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Price and Chart Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart Area */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{formatPrice(crypto.price)}</div>
                      <div
                        className={`flex items-center gap-1 ${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {crypto.change24h >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-medium">
                          {crypto.change24h >= 0 ? "+" : ""}
                          {crypto.change24h.toFixed(2)}%
                        </span>
                        <span className="text-gray-500 text-sm">(24h)</span>
                      </div>
                    </div>
                    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                      {["1H", "24H", "7D", "30D", "1Y"].map((period) => (
                        <Button
                          key={period}
                          variant={timeframe === period.toLowerCase() ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setTimeframe(period.toLowerCase())}
                          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                            timeframe === period.toLowerCase()
                              ? "bg-white text-gray-900 shadow-sm"
                              : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                          }`}
                        >
                          {period}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={priceData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                        <defs>
                          <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
                          </linearGradient>
                          <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                        <XAxis
                          dataKey="formattedTime"
                          stroke="#9ca3af"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: "#9ca3af" }}
                        />
                        <YAxis
                          stroke="#9ca3af"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: "#9ca3af" }}
                          tickFormatter={(value) => formatPrice(value)}
                          domain={["dataMin - 100", "dataMax + 100"]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine y={referencePrice} stroke="#9ca3af" strokeDasharray="2 2" strokeOpacity={0.7} />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke={crypto.change24h >= 0 ? "#22c55e" : "#ef4444"}
                          strokeWidth={2}
                          fill={crypto.change24h >= 0 ? "url(#colorGreen)" : "url(#colorRed)"}
                          dot={false}
                          activeDot={{
                            r: 4,
                            stroke: crypto.change24h >= 0 ? "#22c55e" : "#ef4444",
                            strokeWidth: 2,
                            fill: "white",
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div className="absolute bottom-4 right-4">
                      <div
                        className={`px-2 py-1 rounded text-sm font-medium text-white ${
                          crypto.change24h >= 0 ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {formatPrice(crypto.price)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Market Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Market Cap</span>
                    <span className="font-medium">{formatMarketCap(crypto.marketCap)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">24h Volume</span>
                    <span className="font-medium">{formatMarketCap(crypto.volume24h)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Circulating Supply</span>
                    <span className="font-medium">
                      {formatSupply(crypto.circulatingSupply)} {crypto.symbol}
                    </span>
                  </div>
                  {crypto.maxSupply && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Supply</span>
                      <span className="font-medium">
                        {formatSupply(crypto.maxSupply)} {crypto.symbol}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">All-Time High</span>
                    <span className="font-medium">{formatPrice(crypto.allTimeHigh)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">All-Time Low</span>
                    <span className="font-medium">{formatPrice(crypto.allTimeLow)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Price Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">24h Change</span>
                    <span className={crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}>
                      {crypto.change24h >= 0 ? "+" : ""}
                      {crypto.change24h.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">7d Change</span>
                    <span className={crypto.change7d >= 0 ? "text-green-500" : "text-red-500"}>
                      {crypto.change7d >= 0 ? "+" : ""}
                      {crypto.change7d.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">30d Change</span>
                    <span className={crypto.change30d >= 0 ? "text-green-500" : "text-red-500"}>
                      {crypto.change30d >= 0 ? "+" : ""}
                      {crypto.change30d.toFixed(2)}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href={crypto.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Official Website
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href={crypto.explorer} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Block Explorer
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href={crypto.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href={crypto.reddit} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Reddit
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="markets">Markets</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {crypto.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{crypto.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {crypto.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="markets" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Markets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-lg font-medium mb-2">Market Data</div>
                    <div className="text-sm text-muted-foreground">
                      Exchange listings and trading pairs would be displayed here
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="news" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Latest News</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-lg font-medium mb-2">News Feed</div>
                    <div className="text-sm text-muted-foreground">
                      Latest news and updates about {crypto.name} would be displayed here
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
