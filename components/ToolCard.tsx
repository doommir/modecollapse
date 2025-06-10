"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star } from "lucide-react"
import type { Tool } from "@/lib/tools"

interface ToolCardProps {
  tool: Tool & {
    icon?: React.ReactNode
    isEditorsPick?: boolean
    href?: string
  }
  showThumbnail?: boolean
  variant?: "default" | "featured"
}

export function ToolCard({ tool, showThumbnail = true, variant = "default" }: ToolCardProps) {
  const href = tool.href || `/tools/${tool.slug}`
  const fallbackImage = "/placeholder.svg"
  
  return (
    <Card
      className={`
        ${variant === "featured" 
          ? "bg-dark-purple/70 border-2 border-transparent bg-gradient-to-r from-electric-blue/10 to-neon-magenta/10 hover:from-electric-blue/20 hover:to-neon-magenta/20" 
          : "bg-dark-purple/50 border-cyber-purple/30 hover:border-electric-blue/50"
        } 
        transition-all duration-300 group hover:scale-[1.02] relative overflow-hidden
        ${tool.isEditorsPick ? "ring-1 ring-neon-magenta/30 shadow-lg shadow-neon-magenta/10" : ""}
      `}
    >
      {variant === "featured" && (
        <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/5 to-neon-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      
      <CardContent className="p-0 relative z-10">
        {/* Thumbnail Image */}
        {showThumbnail && (
          <Link href={href} className="block">
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
              <Image
                src={tool.screenshotUrl || fallbackImage}
                alt={`${tool.name} screenshot`}
                width={400}
                height={240}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  if (target.src !== fallbackImage) {
                    target.src = fallbackImage
                  }
                }}
              />
              
              {/* Overlay Elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Editor's Pick Badge */}
              {tool.isEditorsPick && (
                <div className="absolute top-3 right-3">
                  <div className="bg-gradient-to-r from-electric-blue to-neon-magenta rounded-full p-1">
                    <Star className="w-3 h-3 text-white fill-current" />
                  </div>
                </div>
              )}
              
              {/* Featured Badge for featured variant */}
              {variant === "featured" && (
                <div className="absolute top-3 right-3">
                  <div className="bg-gradient-to-r from-electric-blue to-neon-magenta rounded-full p-1">
                    <Star className="w-3 h-3 text-white fill-current" />
                  </div>
                </div>
              )}
            </div>
          </Link>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {tool.icon && !showThumbnail && (
                <div className="text-electric-blue group-hover:text-neon-magenta transition-colors">
                  {tool.icon}
                </div>
              )}
              <Link href={href}>
                <h3 className="font-geometric font-semibold text-lg group-hover:text-electric-blue transition-colors">
                  {tool.name}
                </h3>
              </Link>
            </div>
            {tool.isEditorsPick && !showThumbnail && (
              <div className="flex items-center gap-1 text-neon-magenta">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-xs font-medium">Pick</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-white/70 mb-4 text-sm leading-relaxed line-clamp-3">
            {tool.summary || tool.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tool.tags.slice(0, 4).map((tag, tagIndex) => (
              <Badge
                key={tagIndex}
                variant="secondary"
                className="bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Learn More Button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-electric-blue hover:text-white hover:bg-electric-blue/20 p-0 h-auto font-medium group/btn"
            asChild
          >
            <Link href={href} className="flex items-center gap-2">
              Learn More 
              <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}