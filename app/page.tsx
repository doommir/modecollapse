"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NewsletterModal } from "@/components/newsletter-modal"
import { ToolSearchBar } from "@/components/ToolSearchBar"
import { SubmitToolCTA } from "@/components/SubmitToolCTA"
import { ToolCard } from "@/components/ToolCard"
import { getFeaturedGoogleTools } from "@/lib/tools"
import { Brain, Zap, Sparkles, Code, Palette, MessageSquare, ExternalLink, Linkedin, TrendingUp, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)
  const [filteredTools, setFilteredTools] = useState<any[]>([])

  // Get Google I/O tools
  const featuredGoogleTools = getFeaturedGoogleTools()

  const featuredTools = [
    {
      icon: <Brain className="w-6 h-6" />,
      name: "Claude Artifacts",
      summary: "Interactive code generation with real-time preview",
      description: "Interactive code generation with real-time preview",
      tags: ["GPT-4o", "Free", "Coding"],
      href: "/tools/claude-artifacts",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      name: "Midjourney Alpha",
      summary: "Next-gen image synthesis for visual storytelling",
      description: "Next-gen image synthesis for visual storytelling",
      tags: ["Image Gen", "Premium", "Creative"],
      href: "/tools/midjourney-alpha",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      name: "Cursor AI",
      summary: "AI-powered code editor that thinks with you",
      description: "AI-powered code editor that thinks with you",
      tags: ["Coding", "Automation", "Pro"],
      href: "/tools/cursor-ai",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      name: "Perplexity Pro",
      summary: "Research assistant that cites real sources",
      description: "Research assistant that cites real sources",
      tags: ["Research", "GPT-4", "Premium"],
      href: "/tools/perplexity-pro",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      name: "RunwayML Gen-3",
      summary: "Video generation from text and images",
      description: "Video generation from text and images",
      tags: ["Video", "Creative", "Beta"],
      href: "/tools/runwayml-gen3",
    },
    {
      icon: <Code className="w-6 h-6" />,
      name: "GitHub Copilot",
      summary: "Your AI pair programmer for faster development",
      description: "Your AI pair programmer for faster development",
      tags: ["Coding", "GitHub", "Subscription"],
      href: "/tools/github-copilot",
    },
  ]

  // Initialize filteredTools with all tools on component mount
  useEffect(() => {
    setFilteredTools(featuredTools)
  }, [featuredTools])

  return (
    <div className="min-h-screen bg-deep-purple text-white">
      {/* Hero Section */}
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
          <div className="max-w-2xl mx-auto mb-8">
            <ToolSearchBar 
              tools={featuredTools} 
              onFilter={setFilteredTools}
              placeholder="Search AI tools... Try 'coding', 'creative', or 'research'"
              className="w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyber-purple to-glow-blue hover:from-cyber-purple/80 hover:to-glow-blue/80 text-white font-medium px-8 py-4 rounded-xl animate-pulse-glow"
              asChild
            >
              <Link href="/tools">Browse Tools</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsNewsletterOpen(true)}
              className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-deep-purple font-medium px-8 py-4 rounded-xl"
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

      {/* Featured by Google I/O 2025 */}
      <section className="py-16 px-6 bg-gradient-to-r from-dark-purple/30 to-cyber-purple/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-electric-blue/20 to-neon-magenta/20 border border-electric-blue/30 rounded-full px-6 py-2 mb-4">
              <Star className="w-4 h-4 text-electric-blue fill-current" />
              <span className="text-electric-blue font-medium text-sm">Featured by Google I/O 2025</span>
            </div>
            <h2 className="font-geometric text-3xl md:text-4xl font-bold mb-4">
              The{" "}
              <span className="bg-gradient-to-r from-electric-blue to-neon-magenta bg-clip-text text-transparent">
                Next Evolution
              </span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Google's latest AI breakthroughs that are reshaping how we interact with technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {featuredGoogleTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                tool={tool}
                variant="featured"
                showThumbnail={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-geometric text-3xl md:text-4xl font-bold text-center mb-12">
            Featured{" "}
            <span className="bg-gradient-to-r from-electric-blue to-neon-magenta bg-clip-text text-transparent">
              AI Tools
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
              <ToolCard
                key={index}
                tool={{
                  ...tool,
                  slug: tool.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
                  url: tool.href || `#`,
                  description: tool.description,
                  consciousnessScore: 4,
                  curatorNote: "",
                  promptTips: []
                }}
                showThumbnail={false}
                variant="default"
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-dark-purple/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-geometric text-3xl md:text-4xl font-bold mb-6">
                Break the{" "}
                <span className="bg-gradient-to-r from-neon-magenta to-electric-blue bg-clip-text text-transparent">
                  Loop
                </span>
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Mode Collapse is more than a directory—it's a digital mystery school for the AI awakening. We curate
                consciousness-expanding tools that help you transcend algorithmic limitations and build your own path in
                the intelligence revolution.
              </p>
              <p className="text-white/60">
                Every tool is tested by humans who understand that true AI mastery comes from conscious curation, not
                endless feeds.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-cyber-purple/20 to-electric-blue/20 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-neon-magenta/30 to-cyber-purple/30 rounded-full flex items-center justify-center animate-pulse-glow">
                    <Brain className="w-16 h-16 text-electric-blue" />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-magenta rounded-full animate-float"></div>
                <div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-electric-blue rounded-full animate-float"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Tool CTA */}
      <SubmitToolCTA />

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-dark-purple to-cyber-purple/20 rounded-2xl p-8 md:p-12 border border-cyber-purple/30">
            <h2 className="font-geometric text-3xl md:text-4xl font-bold mb-6">
              Want to build your own{" "}
              <span className="bg-gradient-to-r from-electric-blue to-neon-magenta bg-clip-text text-transparent">
                AI shovels?
              </span>
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Join our exclusive workshop series and learn to create tools that create tools.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-neon-magenta to-electric-blue hover:from-neon-magenta/80 hover:to-electric-blue/80 text-white font-medium px-8 py-4 rounded-xl"
            >
              Join the Workshop Waitlist
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-cyber-purple/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-electric-blue" />
              <span className="font-geometric text-xl font-bold">Mode Collapse</span>
            </div>

            <nav className="flex flex-wrap justify-center gap-6 text-white/70">
              <a href="#" className="hover:text-electric-blue transition-colors">
                Tools
              </a>
              <a href="#" className="hover:text-electric-blue transition-colors">
                About
              </a>
              <button onClick={() => setIsNewsletterOpen(true)} className="hover:text-electric-blue transition-colors">
                Newsletter
              </button>
              <a href="#" className="hover:text-electric-blue transition-colors flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> TikTok
              </a>
              <a href="#" className="hover:text-electric-blue transition-colors flex items-center gap-1">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </nav>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-cyber-purple/20">
            <p className="text-white/40 text-sm font-geometric">Initiation begins when the scroll ends.</p>
          </div>
        </div>
      </footer>

      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
    </div>
  )
}
