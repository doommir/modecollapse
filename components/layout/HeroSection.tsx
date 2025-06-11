"use client"

import { Button } from "@/components/ui/button"
import { ToolSearchBar } from "@/components/tools"
import Link from "next/link"
import type { Tool } from "@/types"

interface HeroSectionProps {
  featuredTools: Tool[]
  onFilter: (filteredTools: Tool[]) => void
  onNewsletterOpen: () => void
}

export function HeroSection({ featuredTools, onFilter, onNewsletterOpen }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center particle-bg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-purple/50 to-deep-purple"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="animate-float">
          <h1 className="font-geometric text-5xl md:text-7xl font-bold mb-6 glow-text">
            Escape the{" "}
            <span className="bg-gradient-to-r from-electric-blue to-neon-magenta bg-clip-text text-transparent">
              Algorithmic Trance
            </span>
          </h1>
        </div>

        <p className="text-xl md:text-2xl text-white/80 mb-8 font-light">
          The smartest AI tools. Curated by humans. Powered by consciousness.
        </p>

        {/* Hero Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 relative z-20">
          <ToolSearchBar 
            tools={featuredTools} 
            onFilter={onFilter}
            placeholder="Search AI tools... Try 'coding', 'creative', or 'research'"
            className="w-full"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20">
          <Link href="/tools">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyber-purple to-glow-blue hover:from-cyber-purple/80 hover:to-glow-blue/80 text-white font-medium px-8 py-4 rounded-xl animate-pulse-glow w-full sm:w-auto"
            >
              Browse Tools
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={onNewsletterOpen}
            className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-deep-purple font-medium px-8 py-4 rounded-xl w-full sm:w-auto relative z-20"
          >
            Join the Movement
          </Button>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-electric-blue rounded-full animate-float"></div>
      <div
        className="absolute top-40 right-20 w-1 h-1 bg-neon-magenta rounded-full animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-cyber-purple rounded-full animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
    </section>
  )
}