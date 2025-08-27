"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  TrendingUp,
  Newspaper,
  BookOpen,
  Compass,
  Star,
  Users,
  Zap,
  Search,
  Wallet,
  Coins,
  Shield,
  Globe,
  CheckCircle,
  Clock,
  Award,
  Target,
  Eye,
  Lightbulb,
  Plus,
  Minus,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const featuredTools = [
    {
      id: "metamask",
      name: "MetaMask",
      description: "The leading self-custodial wallet for Web3",
      category: "Wallet",
      rating: 4.8,
      users: "30M+",
      icon: Wallet,
      color: "bg-orange-500",
    },
    {
      id: "uniswap",
      name: "Uniswap",
      description: "Decentralized trading protocol",
      category: "DeFi",
      rating: 4.7,
      users: "4M+",
      icon: Coins,
      color: "bg-pink-500",
    },
    {
      id: "opensea",
      name: "OpenSea",
      description: "The largest NFT marketplace",
      category: "NFT",
      rating: 4.5,
      users: "2M+",
      icon: Globe,
      color: "bg-blue-500",
    },
    {
      id: "chainlink",
      name: "Chainlink",
      description: "Decentralized oracle network",
      category: "Infrastructure",
      rating: 4.9,
      users: "1000+",
      icon: Shield,
      color: "bg-blue-600",
    },
    {
      id: "compound",
      name: "Compound",
      description: "Autonomous interest rate protocol",
      category: "DeFi",
      rating: 4.6,
      users: "500K+",
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      id: "aave",
      name: "Aave",
      description: "Open source liquidity protocol",
      category: "DeFi",
      rating: 4.7,
      users: "800K+",
      icon: Coins,
      color: "bg-purple-500",
    },
    {
      id: "polygon",
      name: "Polygon",
      description: "Ethereum scaling and infrastructure",
      category: "Infrastructure",
      rating: 4.8,
      users: "1M+",
      icon: Shield,
      color: "bg-purple-600",
    },
    {
      id: "1inch",
      name: "1inch",
      description: "DeFi aggregator with best rates",
      category: "DeFi",
      rating: 4.5,
      users: "600K+",
      icon: Zap,
      color: "bg-red-500",
    },
  ]

  const stats = [
    { label: "Web3 Tools", value: "10,000+", icon: Compass, description: "Curated & Verified" },
    { label: "Daily Updates", value: "100+", icon: TrendingUp, description: "Fresh Content Daily" },
    { label: "Active Users", value: "50K+", icon: Users, description: "Growing Community" },
    { label: "Success Rate", value: "99%", icon: Star, description: "Trusted Platform" },
  ]

  const features = [
    {
      icon: Award,
      title: "Expert Curation",
      description:
        "Each newly added tool is reviewed by LinkWeb3. We test, verify, and organize tools into 350+ categories and 400+ hashtags for precise discovery, with using ChatGPT and Claude.",
      highlight: "Quality over quantity, always",
      color: "bg-green-500",
    },
    {
      icon: Lightbulb,
      title: "Tool Info & Web3 Content",
      description:
        "Every tool has a detailed info, features, and how to use real users. We also provide useful blog posts, video tutorials, and practical guides to help you make informed decisions.",
      highlight: "For users",
      color: "bg-blue-500",
    },
    {
      icon: Search,
      title: "Intelligent Search",
      description:
        "Our AI-powered search understands your needs in plain English. Ask 'tools for social media content creation' and get perfectly matched results.",
      highlight: "Smart search, smarter results",
      color: "bg-purple-500",
    },
  ]

  const faqs = [
    {
      question: "What is LinkWeb3 and what does it do?",
      answer:
        "LinkWeb3 is a directory of best Web3 websites and tools in the market. But not just that, we also provide you with the latest Web3 news, useful blog posts, video tutorials, and practical guides to help you make informed decisions. We use the advanced search technology on our platform so that you can search by category, task, use case or even by asking natural language questions.",
    },
    {
      question: "How many tools are there in LinkWeb3?",
      answer:
        "We currently have over 10,000+ Web3 tools and websites in our directory, spanning across 350+ categories. We add new tools daily and continuously update our database to ensure you have access to the latest and most relevant Web3 resources.",
    },
    {
      question: "Is LinkWeb3 free?",
      answer:
        "Yes! LinkWeb3 is completely free to use. You can browse our entire directory, read news articles, access learning resources, and use our search functionality without any cost. We believe in democratizing access to Web3 tools and information.",
    },
    {
      question: "What is the Web3 search and how does it work?",
      answer:
        "Our intelligent search uses advanced algorithms to understand your queries in natural language. You can search by category, specific use cases, or ask questions like 'best DeFi tools for yield farming' and get precisely matched results with detailed information about each tool.",
    },
    {
      question: "Can I submit my Web3 tool to this site?",
      answer:
        "We welcome submissions of new Web3 tools and websites. Each submission goes through our expert curation process where we test, verify, and categorize the tool before adding it to our directory. You can submit your tool through our contact form.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Zap className="mr-1 h-3 w-3" />
              Your Ultimate Web3 Discovery Platform
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance mb-6">
              Discover the Best <span className="text-primary">Web3 Tools</span>
            </h1>
            <p className="text-lg leading-8 text-muted-foreground text-pretty mb-8 max-w-3xl mx-auto">
              Find the best 10,000+ Web3 websites and tools from 350+ categories and 400+ hashtags. Make your work more
              efficient, automate the processes, and change the way you work with the latest Web3 innovations.
            </p>

            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search Web3 tools & resources"
                  className="pl-10 pr-4 py-3 text-center bg-background border-2"
                />
                <Button size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-x-4">
              <Link href="/directory?category=DeFi">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Top DeFi Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/directory?sort=popular">
                <Button variant="outline" size="lg">
                  Popular
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 bg-background/50">
                <CardContent className="pt-6">
                  <stat.icon className="mx-auto h-8 w-8 text-primary mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Compass className="mr-1 h-3 w-3" />
              Best Web3 Tools Discovery
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-6">About LinkWeb3</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              LinkWeb3 is the most comprehensive Web3 tools directory, designed to democratize access to decentralized
              technologies. We select, organize, and present over 10,000 Web3 tools in an intuitive platform that serves
              everyone from curious beginners to professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-green-500/10 mr-3">
                  <Target className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold">Our Mission</h3>
              </div>
              <p className="text-muted-foreground">
                To make Web3 technologies accessible and understandable for everyone. We believe Web3 should empower
                individuals and businesses regardless of their technical background or budget constraints.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10 mr-3">
                  <Eye className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Our Vision</h3>
              </div>
              <p className="text-muted-foreground">
                To become the definitive platform where anyone can discover, learn about, and successfully implement
                Web3 solutions that transform their work and creativity.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Makes LinkWeb3 Different?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              We are not just a directory of tools. LinkWeb3 is your one-stop Web3 discovery platform that not only
              provides you with tools, but also the latest Web3 news, useful blog posts, video tutorials, and practical
              guides.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center">
                <div className={`inline-flex p-3 rounded-lg ${feature.color}/10 mb-4`}>
                  <feature.icon
                    className={`h-8 w-8 text-white`}
                    style={{
                      color:
                        feature.color.replace("bg-", "").replace("-500", "") === "green"
                          ? "#10b981"
                          : feature.color.replace("bg-", "").replace("-500", "") === "blue"
                            ? "#3b82f6"
                            : "#8b5cf6",
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Badge variant="outline" className="text-xs">
                  {feature.highlight}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Featured
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Web3 Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These are the tools that are currently featured on LinkWeb3. Check them out and vote for your favorites!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool, index) => (
              <Link key={index} href={`/directory/${tool.id}`}>
                <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${tool.color}`}>
                        <tool.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {tool.rating}
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                    <CardDescription className="text-sm">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {tool.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{tool.users} users</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/directory">
              <Button variant="outline" size="lg">
                View All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Built for Everyone Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Built for Everyone</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From Web3 newcomers to professionals, LinkWeb3 serves diverse communities with tailored solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">For Individuals</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Content Creators:</p>
                    <p className="text-sm text-muted-foreground">
                      NFT minting, social media tools, and creative platforms
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Students & Researchers:</p>
                    <p className="text-sm text-muted-foreground">
                      Learning aids, research tools, and productivity enhancers
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Freelancers:</p>
                    <p className="text-sm text-muted-foreground">
                      Project management, client communication, and skill development tools
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">For Businesses</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Startups:</p>
                    <p className="text-sm text-muted-foreground">
                      Cost-effective automation and growth tools like DeFi protocols, chatbots, social media management,
                      and more
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Marketing Teams:</p>
                    <p className="text-sm text-muted-foreground">
                      Campaign optimization, analytics, and content creation
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Developers:</p>
                    <p className="text-sm text-muted-foreground">Code generation, testing, and deployment automation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Promise Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Target className="mr-1 h-3 w-3" />
              Our Promise to You
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">Your Success is Our Success</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              We're dedicated to solving the challenge of finding the right Web3 tools for your needs. Our platform is
              designed to cut through the noise, helping you discover, compare, and choose the best Web3 solutions
              quickly and easily, so you can focus on what matters most.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="inline-flex p-3 rounded-lg bg-green-500/10 mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Always Free</h3>
              <p className="text-muted-foreground">Core features remain free forever</p>
            </Card>

            <Card className="text-center p-6">
              <div className="inline-flex p-3 rounded-lg bg-blue-500/10 mb-4">
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Daily Updates</h3>
              <p className="text-muted-foreground">Fresh content and tools added daily</p>
            </Card>

            <Card className="text-center p-6">
              <div className="inline-flex p-3 rounded-lg bg-purple-500/10 mb-4">
                <Award className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality First</h3>
              <p className="text-muted-foreground">Expert curation and real user reviews</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Explore More</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the latest trends, prices, and educational content in the Web3 space
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Crypto Prices</CardTitle>
                <CardDescription>
                  Real-time cryptocurrency prices and market data with detailed analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/prices">
                  <Button variant="outline" className="w-full bg-transparent">
                    View Prices
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Newspaper className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Latest News</CardTitle>
                <CardDescription>
                  Stay updated with the latest Web3 and crypto news from trusted sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/news">
                  <Button variant="outline" className="w-full bg-transparent">
                    Read News
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Learning Hub</CardTitle>
                <CardDescription>Educational resources and tutorials to master Web3 technologies</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/learn">
                  <Button variant="outline" className="w-full bg-transparent">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about LinkWeb3</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <h3 className="font-semibold pr-4">{faq.question}</h3>
                  {openFaq === index ? (
                    <Minus className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <Plus className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
