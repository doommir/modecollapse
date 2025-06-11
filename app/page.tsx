"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  HeroSection, 
  GoogleIOSection, 
  FeaturedToolsGrid, 
  AboutSection, 
  Footer 
} from "@/components/layout"
import { SubmitToolCTA, NewsletterModal } from "@/components"
import { getFeaturedGoogleTools } from "@/lib/tools"
import { Brain, Zap, Sparkles, Code, Palette, MessageSquare } from "lucide-react"

export default function HomePage() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)
  const [filteredTools, setFilteredTools] = useState<any[]>([])

  // Get Google I/O tools
  const featuredGoogleTools = getFeaturedGoogleTools()

  // Featured tools data - TODO: Move to lib/tools.ts or data source
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
  }, [])

  return (
    <div className="min-h-screen bg-deep-purple text-white">
      {/* Hero Section */}
      <HeroSection
        featuredTools={featuredTools}
        onFilter={setFilteredTools}
        onNewsletterOpen={() => setIsNewsletterOpen(true)}
      />

      {/* Featured by Google I/O 2025 */}
      <GoogleIOSection featuredGoogleTools={featuredGoogleTools} />

      {/* Featured Tools Grid */}
      <FeaturedToolsGrid filteredTools={filteredTools} />

      {/* About Section */}
      <AboutSection />

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
      <Footer onNewsletterOpen={() => setIsNewsletterOpen(true)} />

      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
    </div>
  )
}