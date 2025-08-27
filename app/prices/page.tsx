"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, TrendingUp, TrendingDown, Star, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function PricesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("market_cap")
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Mock cryptocurrency data - in real app, this would come from an API
  const [cryptoData, setCryptoData] = useState([
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      price: 97850.32,
      change24h: 2.45,
      change7d: -1.23,
      marketCap: 1940000000000,
      volume24h: 28500000000,
      rank: 1,
      image: "/bitcoin-logo.png",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      price: 3420.89,
      change24h: 3.78,
      change7d: 5.67,
      marketCap: 411200000000,
      volume24h: 15200000000,
      rank: 2,
      image: "/ethereum-logo.png",
    },
    {
      id: "binancecoin",
      name: "BNB",
      symbol: "BNB",
      price: 695.42,
      change24h: -1.56,
      change7d: 2.34,
      marketCap: 100800000000,
      volume24h: 1200000000,
      rank: 3,
      image: "/bnb-logo.png",
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      price: 185.76,
      change24h: 5.23,
      change7d: 12.45,
      marketCap: 87200000000,
      volume24h: 2800000000,
      rank: 4,
      image: "/solana-logo.png",
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      price: 0.885,
      change24h: -2.34,
      change7d: -0.87,
      marketCap: 31100000000,
      volume24h: 450000000,
      rank: 5,
      image: "/cardano-logo.png",
    },
    {
      id: "avalanche",
      name: "Avalanche",
      symbol: "AVAX",
      price: 42.78,
      change24h: 4.56,
      change7d: 8.92,
      marketCap: 17500000000,
      volume24h: 680000000,
      rank: 6,
      image: "/avalanche-logo-abstract.png",
    },
    {
      id: "polkadot",
      name: "Polkadot",
      symbol: "DOT",
      price: 8.23,
      change24h: 1.87,
      change7d: -3.45,
      marketCap: 11800000000,
      volume24h: 320000000,
      rank: 7,
      image: "/polkadot-logo.png",
    },
    {
      id: "chainlink",
      name: "Chainlink",
      symbol: "LINK",
      price: 22.56,
      change24h: 3.21,
      change7d: 6.78,
      marketCap: 14200000000,
      volume24h: 580000000,
      rank: 8,
      image: "/chainlink-logo.png",
    },
  ])

  const filteredData = cryptoData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case "market_cap":
        return b.marketCap - a.marketCap
      case "price":
        return b.price - a.price
      case "change24h":
        return b.change24h - a.change24h
      case "volume":
        return b.volume24h - a.volume24h
      default:
        return a.rank - b.rank
    }
  })

  const formatPrice = (price: number) => {
    if (price < 1) {
      return `$${price.toFixed(4)}`
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

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`
    }
    return `$${(volume / 1e6).toFixed(2)}M`
  }

  const refreshData = () => {
    // Simulate data refresh with small random changes
    setCryptoData((prev) =>
      prev.map((crypto) => ({
        ...crypto,
        price: crypto.price * (1 + (Math.random() - 0.5) * 0.02),
        change24h: crypto.change24h + (Math.random() - 0.5) * 2,
      })),
    )
    setLastUpdated(new Date())
  }

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshData, 30000)
    return () => clearInterval(interval)
  }, [])

  const topGainers = cryptoData
    .filter((crypto) => crypto.change24h > 0)
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 3)

  const topLosers = cryptoData
    .filter((crypto) => crypto.change24h < 0)
    .sort((a, b) => a.change24h - b.change24h)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Cryptocurrency Prices</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Real-time cryptocurrency prices, market caps, and trading volumes. Stay updated with the latest market
              movements.
            </p>
          </div>

          {/* Market Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Top Gainers (24h)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {topGainers.map((crypto) => (
                  <div key={crypto.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={crypto.image || "/placeholder.svg"}
                        alt={crypto.name}
                        className="w-4 h-4 rounded-full"
                      />
                      <span className="text-sm font-medium">{crypto.symbol}</span>
                    </div>
                    <div className="flex items-center text-green-500">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span className="text-sm">+{crypto.change24h.toFixed(2)}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Top Losers (24h)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {topLosers.map((crypto) => (
                  <div key={crypto.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={crypto.image || "/placeholder.svg"}
                        alt={crypto.name}
                        className="w-4 h-4 rounded-full"
                      />
                      <span className="text-sm font-medium">{crypto.symbol}</span>
                    </div>
                    <div className="flex items-center text-red-500">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      <span className="text-sm">{crypto.change24h.toFixed(2)}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Market Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Market Cap</span>
                  <span className="text-sm font-medium">$2.35T</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">24h Volume</span>
                  <span className="text-sm font-medium">$100.5B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">BTC Dominance</span>
                  <span className="text-sm font-medium">82.9%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cryptocurrencies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market_cap">Market Cap</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="change24h">24h Change</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={refreshData} className="flex items-center gap-2 bg-transparent">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>

            <div className="text-sm text-muted-foreground mb-4">
              Last updated: {lastUpdated.toLocaleTimeString()} • Showing {sortedData.length} cryptocurrencies
            </div>
          </div>
        </div>
      </section>

      {/* Price Table */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">24h %</TableHead>
                    <TableHead className="text-right">7d %</TableHead>
                    <TableHead className="text-right">Market Cap</TableHead>
                    <TableHead className="text-right">Volume (24h)</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedData.map((crypto) => (
                    <TableRow key={crypto.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{crypto.rank}</TableCell>
                      <TableCell>
                        <Link href={`/prices/${crypto.id}`} className="flex items-center gap-3 hover:opacity-80">
                          <img
                            src={crypto.image || "/placeholder.svg"}
                            alt={crypto.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <div className="font-medium">{crypto.name}</div>
                            <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="text-right font-medium">{formatPrice(crypto.price)}</TableCell>
                      <TableCell className="text-right">
                        <div
                          className={`flex items-center justify-end ${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {crypto.change24h >= 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {crypto.change24h >= 0 ? "+" : ""}
                          {crypto.change24h.toFixed(2)}%
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={crypto.change7d >= 0 ? "text-green-500" : "text-red-500"}>
                          {crypto.change7d >= 0 ? "+" : ""}
                          {crypto.change7d.toFixed(2)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{formatMarketCap(crypto.marketCap)}</TableCell>
                      <TableCell className="text-right">{formatVolume(crypto.volume24h)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Star className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
