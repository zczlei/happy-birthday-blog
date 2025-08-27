"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Star,
  Users,
  Globe,
  Zap,
  Heart,
  Share2,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Image from "next/image"

interface Tool {
  id: number
  name: string
  description: string
  fullDescription: string
  category: string
  rating: number
  users: string
  website: string
  logo: string
  tags: string[]
  features: string[]
  useCases: {
    title: string
    description: string
    example: string
  }[]
  pros: string[]
  cons: string[]
  pricing: {
    type: string
    details: string
  }
  faq: {
    question: string
    answer: string
  }[]
}

interface RelatedTool {
  id: number
  name: string
  category: string
  rating: number
  logo: string
}

const relatedTools = [
  { id: 3, name: "OpenSea", category: "NFT Marketplace", rating: 4.5, logo: "/placeholder-ven8h.png" },
  { id: 4, name: "Compound", category: "DeFi", rating: 4.6, logo: "/placeholder-mzm5p.png" },
  { id: 5, name: "Aave", category: "DeFi", rating: 4.7, logo: "/placeholder-vuhg6.png" },
]

const getToolById = (id: string): Tool | null => {
  const tools: Record<string, Tool> = {
    metamask: {
      id: 1,
      name: "MetaMask",
      description: "The leading self-custodial wallet for Web3",
      fullDescription:
        "MetaMask is a cryptocurrency wallet and gateway to blockchain apps. It allows users to store and manage account keys, broadcast transactions, send and receive Ethereum-based cryptocurrencies and tokens, and securely connect to decentralized applications through a compatible web browser or the mobile app's built-in browser.",
      category: "Wallet",
      rating: 4.8,
      users: "30M+ users",
      website: "https://metamask.io",
      logo: "/metamask-wallet-logo-orange-fox.png",
      tags: ["Wallet", "Browser Extension", "Mobile App", "Web3"],
      features: [
        "Secure cryptocurrency wallet",
        "Browser extension and mobile app",
        "Connect to thousands of dApps",
        "Buy, store, send and swap tokens",
        "Hardware wallet support",
        "Multi-chain support",
      ],
      useCases: [
        {
          title: "DeFi Trading",
          description: "Connect to decentralized exchanges and lending protocols",
          example: "Use MetaMask to trade on Uniswap or lend on Compound",
        },
        {
          title: "NFT Collection",
          description: "Store and manage your NFT collection",
          example: "View and transfer NFTs from OpenSea directly in MetaMask",
        },
        {
          title: "Web3 Gaming",
          description: "Play blockchain games and manage in-game assets",
          example: "Use MetaMask to play Axie Infinity or other Web3 games",
        },
      ],
      pros: [
        "Most popular and widely supported wallet",
        "Easy to use interface",
        "Strong security features",
        "Active development and updates",
        "Large ecosystem support",
      ],
      cons: [
        "Can be slow during network congestion",
        "Limited customer support",
        "Phishing attack risks",
        "Gas fee estimation issues",
      ],
      pricing: {
        type: "Free",
        details: "Free to download and use. Transaction fees apply based on network usage.",
      },
      faq: [
        {
          question: "Is MetaMask safe to use?",
          answer:
            "MetaMask is generally considered safe when used properly. Always verify URLs, keep your seed phrase secure, and be cautious of phishing attempts.",
        },
        {
          question: "Can I use MetaMask on mobile?",
          answer: "Yes, MetaMask has mobile apps for both iOS and Android devices with full functionality.",
        },
        {
          question: "What networks does MetaMask support?",
          answer:
            "MetaMask supports Ethereum mainnet and many other networks including Polygon, BSC, Avalanche, and more.",
        },
      ],
    },
    uniswap: {
      id: 2,
      name: "Uniswap",
      description: "Decentralized trading protocol",
      fullDescription:
        "Uniswap is a decentralized exchange (DEX) protocol built on Ethereum that allows users to swap ERC-20 tokens without the need for traditional order books. It uses an automated market maker (AMM) model with liquidity pools to facilitate trades.",
      category: "DeFi",
      rating: 4.7,
      users: "4M+ users",
      website: "https://uniswap.org",
      logo: "/placeholder-cwduj.png",
      tags: ["DEX", "DeFi", "AMM", "Ethereum"],
      features: [
        "Decentralized token swapping",
        "Liquidity provision rewards",
        "No registration required",
        "Multi-chain support",
        "Governance token (UNI)",
        "Advanced trading features",
      ],
      useCases: [
        {
          title: "Token Swapping",
          description: "Exchange one cryptocurrency for another instantly",
          example: "Swap ETH for USDC or any other ERC-20 token",
        },
        {
          title: "Liquidity Provision",
          description: "Earn fees by providing liquidity to trading pairs",
          example: "Add ETH/USDC liquidity and earn trading fees",
        },
        {
          title: "Price Discovery",
          description: "Find fair market prices for new or low-volume tokens",
          example: "Check the current price of newly launched tokens",
        },
      ],
      pros: [
        "Fully decentralized and permissionless",
        "High liquidity for major tokens",
        "Innovative AMM technology",
        "Strong governance system",
        "Multi-chain expansion",
      ],
      cons: [
        "High gas fees on Ethereum",
        "Impermanent loss risk for LPs",
        "MEV and front-running issues",
        "Complex for beginners",
      ],
      pricing: {
        type: "Fee-based",
        details: "0.3% trading fee on swaps, plus Ethereum network gas fees.",
      },
      faq: [
        {
          question: "What is impermanent loss?",
          answer:
            "Impermanent loss occurs when the price ratio of tokens in a liquidity pool changes compared to when you deposited them, potentially resulting in less value than holding the tokens separately.",
        },
        {
          question: "How do I provide liquidity on Uniswap?",
          answer:
            "Connect your wallet, select a trading pair, deposit equal values of both tokens, and receive LP tokens representing your share of the pool.",
        },
        {
          question: "Is Uniswap available on other blockchains?",
          answer: "Yes, Uniswap has expanded to Polygon, Arbitrum, Optimism, and other Layer 2 solutions.",
        },
      ],
    },
    opensea: {
      id: 3,
      name: "OpenSea",
      description: "The largest NFT marketplace",
      fullDescription:
        "OpenSea is the world's first and largest web3 marketplace for NFTs and crypto collectibles. Browse, create, buy, sell, and auction NFTs using OpenSea today.",
      category: "NFT",
      rating: 4.5,
      users: "2M+ users",
      website: "https://opensea.io",
      logo: "/placeholder-pwxs8.png",
      tags: ["NFT", "Marketplace", "Collectibles", "Art"],
      features: [
        "Buy and sell NFTs",
        "Create NFT collections",
        "Auction functionality",
        "Multi-chain support",
        "Creator royalties",
        "Advanced filtering",
      ],
      useCases: [
        {
          title: "NFT Trading",
          description: "Buy and sell digital collectibles and art",
          example: "Purchase rare CryptoPunks or Bored Ape NFTs",
        },
        {
          title: "Creator Monetization",
          description: "Artists can mint and sell their digital creations",
          example: "Upload artwork and create an NFT collection",
        },
        {
          title: "Collection Discovery",
          description: "Explore trending and upcoming NFT projects",
          example: "Browse featured collections and discover new artists",
        },
      ],
      pros: [
        "Largest NFT marketplace",
        "User-friendly interface",
        "Wide variety of NFTs",
        "Strong brand recognition",
        "Mobile app available",
      ],
      cons: [
        "High gas fees on Ethereum",
        "Centralized platform risks",
        "Customer support issues",
        "Market manipulation concerns",
      ],
      pricing: {
        type: "Commission-based",
        details: "2.5% fee on successful sales, plus blockchain gas fees.",
      },
      faq: [
        {
          question: "How do I create an NFT on OpenSea?",
          answer:
            "Connect your wallet, go to 'Create', upload your file, add details, and mint your NFT. You can create without upfront gas fees using lazy minting.",
        },
        {
          question: "What wallets work with OpenSea?",
          answer: "OpenSea supports MetaMask, Coinbase Wallet, WalletConnect, and many other popular Web3 wallets.",
        },
        {
          question: "Can I sell NFTs on multiple marketplaces?",
          answer:
            "Yes, you can list your NFTs on multiple marketplaces simultaneously, but be careful about conflicting listings.",
        },
      ],
    },
    chainlink: {
      id: 4,
      name: "Chainlink",
      description: "Decentralized oracle network",
      fullDescription:
        "Chainlink is a decentralized oracle network that enables smart contracts to securely access off-chain data feeds, web APIs, and traditional bank payments.",
      category: "Infrastructure",
      rating: 4.9,
      users: "1000+ users",
      website: "https://chain.link",
      logo: "/placeholder-et493.png",
      tags: ["Oracle", "Infrastructure", "Data", "Smart Contracts"],
      features: [
        "Decentralized oracle network",
        "Price feeds for DeFi",
        "Verifiable randomness",
        "Cross-chain interoperability",
        "Automation services",
        "Proof of Reserve",
      ],
      useCases: [
        {
          title: "DeFi Price Feeds",
          description: "Provide accurate price data for lending and trading protocols",
          example: "Aave uses Chainlink price feeds for liquidation calculations",
        },
        {
          title: "Gaming & NFTs",
          description: "Generate verifiable randomness for games and NFT traits",
          example: "Use Chainlink VRF for fair and transparent random outcomes",
        },
        {
          title: "Insurance",
          description: "Trigger parametric insurance payouts based on real-world data",
          example: "Weather insurance that pays out based on rainfall data",
        },
      ],
      pros: [
        "Most trusted oracle solution",
        "Extensive ecosystem adoption",
        "High security standards",
        "Multiple data sources",
        "Strong development team",
      ],
      cons: [
        "Complex integration process",
        "Costs can be high for small projects",
        "Centralization concerns with some feeds",
        "Technical complexity",
      ],
      pricing: {
        type: "Usage-based",
        details: "Pricing varies by service and usage. Price feeds and VRF have different cost structures.",
      },
      faq: [
        {
          question: "What is an oracle in blockchain?",
          answer:
            "An oracle is a service that connects blockchains to external systems, enabling smart contracts to execute based on real-world data and events.",
        },
        {
          question: "How does Chainlink ensure data accuracy?",
          answer:
            "Chainlink uses multiple independent data sources and node operators, with reputation systems and economic incentives to ensure data quality.",
        },
        {
          question: "Can I become a Chainlink node operator?",
          answer:
            "Yes, you can run a Chainlink node, but it requires technical expertise, reliable infrastructure, and LINK tokens for collateral.",
        },
      ],
    },
    compound: {
      id: 5,
      name: "Compound",
      description: "Autonomous interest rate protocol",
      fullDescription:
        "Compound is an algorithmic, autonomous interest rate protocol built for developers, to unlock a universe of open financial applications.",
      category: "DeFi",
      rating: 4.6,
      users: "500K+ users",
      website: "https://compound.finance",
      logo: "/placeholder-mzm5p.png",
      tags: ["DeFi", "Lending", "Borrowing", "Interest"],
      features: [
        "Algorithmic interest rates",
        "Collateralized borrowing",
        "Governance token (COMP)",
        "Liquidation protection",
        "Multiple asset support",
        "Transparent and audited",
      ],
      useCases: [
        {
          title: "Earn Interest",
          description: "Lend your crypto assets to earn interest",
          example: "Supply USDC to earn variable interest rates",
        },
        {
          title: "Leverage Trading",
          description: "Borrow against your assets for trading",
          example: "Use ETH as collateral to borrow USDC for trading",
        },
        {
          title: "Yield Farming",
          description: "Earn COMP tokens while lending and borrowing",
          example: "Participate in liquidity mining programs",
        },
      ],
      pros: [
        "Established DeFi protocol",
        "Algorithmic interest rates",
        "Strong security record",
        "Governance token rewards",
        "High liquidity",
      ],
      cons: ["Liquidation risks", "Gas fees on Ethereum", "Interest rate volatility", "Complexity for beginners"],
      pricing: {
        type: "Interest-based",
        details:
          "Earn interest on supplied assets, pay interest on borrowed assets. Rates are algorithmically determined.",
      },
      faq: [
        {
          question: "What is the liquidation threshold?",
          answer:
            "Each asset has a specific collateral factor. If your borrowed amount exceeds this threshold due to price changes, your collateral may be liquidated.",
        },
        {
          question: "How are interest rates determined?",
          answer: "Interest rates are algorithmically set based on supply and demand for each asset in the protocol.",
        },
        {
          question: "What is COMP token used for?",
          answer:
            "COMP is the governance token that allows holders to propose and vote on changes to the Compound protocol.",
        },
      ],
    },
    aave: {
      id: 6,
      name: "Aave",
      description: "Open source liquidity protocol",
      fullDescription:
        "Aave is an open source and non-custodial liquidity protocol for earning interest on deposits and borrowing assets.",
      category: "DeFi",
      rating: 4.7,
      users: "800K+ users",
      website: "https://aave.com",
      logo: "/placeholder-vuhg6.png",
      tags: ["DeFi", "Lending", "Flash Loans", "Liquidity"],
      features: [
        "Flash loans",
        "Stable and variable rates",
        "Credit delegation",
        "Multi-chain deployment",
        "Governance (AAVE token)",
        "Safety module",
      ],
      useCases: [
        {
          title: "Flash Loans",
          description: "Borrow without collateral for arbitrage and liquidations",
          example: "Execute arbitrage trades across different DEXs",
        },
        {
          title: "Yield Generation",
          description: "Earn interest on deposited cryptocurrencies",
          example: "Deposit stablecoins to earn steady yields",
        },
        {
          title: "Credit Delegation",
          description: "Delegate borrowing power to other users",
          example: "Allow trusted parties to borrow against your collateral",
        },
      ],
      pros: [
        "Innovative features like flash loans",
        "Multi-chain presence",
        "Strong governance system",
        "High security standards",
        "Active development",
      ],
      cons: ["Complex for new users", "Smart contract risks", "Liquidation penalties", "Gas fees on mainnet"],
      pricing: {
        type: "Interest-based",
        details: "Variable interest rates based on utilization. Flash loan fees are 0.09% of the borrowed amount.",
      },
      faq: [
        {
          question: "What are flash loans?",
          answer:
            "Flash loans allow you to borrow assets without collateral, as long as you repay the loan within the same transaction block.",
        },
        {
          question: "What's the difference between stable and variable rates?",
          answer:
            "Stable rates provide predictable interest costs, while variable rates fluctuate based on market conditions but are typically lower.",
        },
        {
          question: "How does credit delegation work?",
          answer:
            "Credit delegation allows you to delegate your borrowing power to another address, enabling uncollateralized loans to trusted parties.",
        },
      ],
    },
    polygon: {
      id: 7,
      name: "Polygon",
      description: "Ethereum scaling and infrastructure",
      fullDescription:
        "Polygon is a decentralized platform that provides tools and services for developers to build scalable user-ready dApps with low transaction fees without ever sacrificing on security.",
      category: "Infrastructure",
      rating: 4.8,
      users: "1M+ users",
      website: "https://polygon.technology",
      logo: "/placeholder-k7137.png",
      tags: ["Layer 2", "Scaling", "Infrastructure", "Ethereum"],
      features: [
        "Low transaction fees",
        "Fast transaction speeds",
        "Ethereum compatibility",
        "Multiple scaling solutions",
        "Developer-friendly tools",
        "Growing ecosystem",
      ],
      useCases: [
        {
          title: "DeFi Applications",
          description: "Build and use DeFi apps with lower costs",
          example: "Trade on QuickSwap or use Aave on Polygon",
        },
        {
          title: "NFT Marketplaces",
          description: "Create and trade NFTs with minimal fees",
          example: "Mint NFTs on Polygon for fraction of Ethereum costs",
        },
        {
          title: "Gaming",
          description: "Develop blockchain games with fast transactions",
          example: "Play games like Aavegotchi with smooth UX",
        },
      ],
      pros: [
        "Very low transaction fees",
        "Fast confirmation times",
        "Strong developer ecosystem",
        "Ethereum compatibility",
        "Multiple scaling solutions",
      ],
      cons: [
        "Less decentralized than Ethereum",
        "Bridge security risks",
        "Validator centralization concerns",
        "Dependency on Ethereum",
      ],
      pricing: {
        type: "Network fees",
        details: "Transaction fees typically under $0.01, significantly lower than Ethereum mainnet.",
      },
      faq: [
        {
          question: "How do I bridge assets to Polygon?",
          answer:
            "Use the official Polygon Bridge or other trusted bridges like Hop Protocol to move assets between Ethereum and Polygon.",
        },
        {
          question: "Is Polygon secure?",
          answer:
            "Polygon uses various security mechanisms including checkpoints to Ethereum mainnet, but it has different security assumptions than Ethereum.",
        },
        {
          question: "What's the difference between Polygon PoS and other solutions?",
          answer:
            "Polygon offers multiple solutions: PoS Chain (sidechain), zkEVM (zk-rollup), and others, each with different trade-offs.",
        },
      ],
    },
    "1inch": {
      id: 8,
      name: "1inch",
      description: "DeFi aggregator with best rates",
      fullDescription:
        "1inch is a decentralized exchange aggregator that sources liquidity from various exchanges and is capable of splitting a single trade transaction across multiple DEXs to ensure the best rates.",
      category: "DeFi",
      rating: 4.5,
      users: "600K+ users",
      website: "https://1inch.io",
      logo: "/placeholder-xmiq7.png",
      tags: ["DEX Aggregator", "DeFi", "Trading", "Best Rates"],
      features: [
        "DEX aggregation",
        "Best rate finding",
        "Gas optimization",
        "Limit orders",
        "Chi gas token",
        "Multi-chain support",
      ],
      useCases: [
        {
          title: "Optimal Trading",
          description: "Get the best rates by aggregating multiple DEXs",
          example: "Swap tokens across Uniswap, SushiSwap, and others simultaneously",
        },
        {
          title: "Gas Optimization",
          description: "Reduce transaction costs with optimized routing",
          example: "Use Chi gas token to reduce gas costs by up to 42%",
        },
        {
          title: "Limit Orders",
          description: "Set limit orders on decentralized exchanges",
          example: "Set a limit order to buy ETH when it reaches a specific price",
        },
      ],
      pros: [
        "Best rates through aggregation",
        "Gas cost optimization",
        "User-friendly interface",
        "Multi-chain support",
        "Advanced trading features",
      ],
      cons: [
        "Complex routing can fail",
        "Higher gas costs for complex trades",
        "Limited to supported DEXs",
        "Slippage on large trades",
      ],
      pricing: {
        type: "Free with gas fees",
        details: "No platform fees, only network gas fees. Gas optimization features can reduce costs.",
      },
      faq: [
        {
          question: "How does 1inch find the best rates?",
          answer:
            "1inch's Pathfinder algorithm analyzes rates across multiple DEXs and can split trades across different platforms to optimize for the best price.",
        },
        {
          question: "What is Chi gas token?",
          answer:
            "Chi is a gas token that can be minted when gas prices are low and burned during transactions to reduce gas costs by up to 42%.",
        },
        {
          question: "Does 1inch support limit orders?",
          answer:
            "Yes, 1inch offers limit order functionality that allows you to set specific prices for buying or selling tokens.",
        },
      ],
    },
  }

  return tools[id] || null
}

export default function ToolDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [tool, setTool] = useState<Tool | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("overview")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  useEffect(() => {
    if (params.id) {
      const foundTool = getToolById(params.id as string)
      setTool(foundTool)
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading tool details...</p>
        </div>
      </div>
    )
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
          <p className="text-muted-foreground mb-8">The tool you're looking for doesn't exist.</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "use-cases", label: "Use Cases" },
    { id: "pricing", label: "Pricing" },
    { id: "pros-cons", label: "Pros & Cons" },
    { id: "faq", label: "FAQ" },
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar Navigation */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeSection === section.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Directory
              </Button>

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src={tool.logo || "/placeholder.svg"}
                    alt={`${tool.name} logo`}
                    width={80}
                    height={80}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold">{tool.name}</h1>
                    <Badge variant="secondary">{tool.category}</Badge>
                  </div>
                  <p className="text-xl text-muted-foreground mb-4">{tool.description}</p>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{tool.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span>{tool.users}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button asChild>
                      <a href={tool.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-4 w-4" />
                        Visit Website
                      </a>
                    </Button>
                    <Button variant="outline">
                      <Heart className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Overview Section */}
            <section id="overview" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">What is {tool.name}?</h2>
              <p className="text-muted-foreground leading-relaxed">{tool.fullDescription}</p>
            </section>

            {/* Features Section */}
            <section id="features" className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {tool.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg border">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Use Cases Section */}
            <section id="use-cases" className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Use Cases</h2>
              <div className="space-y-6">
                {tool.useCases.map((useCase, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        {useCase.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-3">{useCase.description}</p>
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm">
                          <strong>Example:</strong> {useCase.example}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Pricing</h2>
              <Card>
                <CardHeader>
                  <CardTitle>{tool.pricing.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tool.pricing.details}</p>
                </CardContent>
              </Card>
            </section>

            {/* Pros & Cons Section */}
            <section id="pros-cons" className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Pros & Cons</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">Pros</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tool.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Cons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tool.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {tool.faq.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader
                      className="cursor-pointer"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <CardTitle className="flex items-center justify-between text-lg">
                        {faq.question}
                        {expandedFaq === index ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </CardTitle>
                    </CardHeader>
                    {expandedFaq === index && (
                      <CardContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="hidden xl:block w-80 flex-shrink-0">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle>Related Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedTools.map((relatedTool) => (
                      <div
                        key={relatedTool.id}
                        className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted cursor-pointer"
                      >
                        <Image
                          src={relatedTool.logo || "/placeholder.svg"}
                          alt={`${relatedTool.name} logo`}
                          width={40}
                          height={40}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{relatedTool.name}</h4>
                          <p className="text-xs text-muted-foreground">{relatedTool.category}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{relatedTool.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
