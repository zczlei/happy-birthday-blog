"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X, Zap, Home, Layers, TrendingUp, Newspaper, BookOpen, GraduationCap } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/directory", label: "Web3 Directory", icon: Layers },
    { href: "/prices", label: "Crypto Prices", icon: TrendingUp },
    { href: "/news", label: "News", icon: Newspaper },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/learn", label: "Learn", icon: GraduationCap },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">LinkWeb3</span>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:text-primary rounded-lg hover:bg-accent/50"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="hidden md:flex">
            <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-3 text-base font-medium text-muted-foreground hover:text-primary rounded-lg hover:bg-accent/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <div className="px-3 py-2">
                <Button className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
