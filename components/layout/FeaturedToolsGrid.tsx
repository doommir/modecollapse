"use client"

import { ToolCard } from "@/components/tools"
import type { Tool } from "@/types"

interface FeaturedToolsGridProps {
  filteredTools: Tool[]
}

export function FeaturedToolsGrid({ filteredTools }: FeaturedToolsGridProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-geometric text-3xl md:text-4xl font-bold text-center mb-12">
          All{" "}
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
              showThumbnail={true}
              variant="default"
            />
          ))}
        </div>
      </div>
    </section>
  )
}