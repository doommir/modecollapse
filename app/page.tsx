"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { 
  HeroSection, 
  FeaturedToolsGrid, 
  AboutSection, 
  Footer 
} from "@/components/layout"
import { SubmitToolCTA } from "@/components/SubmitToolCTA"
import { NewsletterModal } from "@/components/newsletter-modal"
import { getAllTools, getCuratorPicks } from "@/lib/tools"
import { ToolCard } from "@/components/tools"
import { Brain, Zap, Sparkles, Code, Palette, MessageSquare } from "lucide-react"


export default function HomePage() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)
  const [filteredTools, setFilteredTools] = useState<any[]>([])

  // Get all tools from the data source
  const allTools = getAllTools()
  const curatorPicks = getCuratorPicks()

  // Initialize filteredTools with all tools on component mount
  useEffect(() => {
    setFilteredTools(allTools)
  }, [allTools])

  // Memoize the filter callback to prevent infinite re-renders
  const handleFilter = useCallback((filteredTools: any[]) => {
    setFilteredTools(filteredTools)
  }, [])

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#0a0a0f', background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)' }}>
      {/* Hero Section */}
      <HeroSection
        featuredTools={allTools}
        onFilter={handleFilter}
        onNewsletterOpen={() => setIsNewsletterOpen(true)}
      />

      {/* Featured Tools Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-geometric text-3xl md:text-4xl font-bold mb-4 text-white">
              Featured{" "}
              <span className="gradient-text-primary" style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AI Tools
              </span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Curated consciousness-expanding tools tested by humans who understand AI mastery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curatorPicks.slice(0, 6).map((tool) => (
              <ToolCard
                key={tool.slug}
                tool={tool}
                showThumbnail={true}
                variant="featured"
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Tools Grid */}
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
              <span className="gradient-text-primary" style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AI shovels?
              </span>
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Join our exclusive workshop series and learn to create tools that create tools.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-neon-magenta to-electric-blue hover:from-neon-magenta/80 hover:to-electric-blue/80 text-white font-medium px-8 py-4 rounded-xl"
              onClick={() => setIsNewsletterOpen(true)}
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