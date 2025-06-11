"use client"

import { Star } from "lucide-react"
import { ToolCard } from "@/components/tools"
import type { Tool } from "@/types"

interface GoogleIOSectionProps {
  featuredGoogleTools: Tool[]
}

export function GoogleIOSection({ featuredGoogleTools }: GoogleIOSectionProps) {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-dark-purple/30 to-cyber-purple/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-electric-blue/20 to-neon-magenta/20 border border-electric-blue/30 rounded-full px-6 py-2 mb-4">
            <Star className="w-4 h-4 text-electric-blue fill-current" />
            <span className="text-electric-blue font-medium text-sm">Featured by Google I/O 2025</span>
          </div>
          <h2 className="font-geometric text-3xl md:text-4xl font-bold mb-4 text-white">
            The{" "}
            <span className="gradient-text-primary" style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
  )
}