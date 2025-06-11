"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star, ChevronUp, ChevronDown, AlertTriangle, Sparkles, Gift } from "lucide-react"
import { ToolImage } from "./ToolImage"
import type { ToolCardProps } from "@/types"

export function ToolCard({ tool, showThumbnail = true, variant = "default", onVote }: ToolCardProps) {
  const href = tool.href || `/tools/${tool.slug || 'unknown'}`
  const fallbackImage = "/placeholder.svg"
  const [isVoting, setIsVoting] = useState(false)
  
  // Safety checks for required properties
  if (!tool || !tool.name) {
    return null
  }

  const handleVote = async (vote: 'up' | 'down') => {
    if (isVoting || !onVote) return
    setIsVoting(true)
    try {
      await onVote(tool.slug, vote)
    } finally {
      setIsVoting(false)
    }
  }

  const netVotes = (tool.votes?.upvotes || 0) - (tool.votes?.downvotes || 0)
  const pricingColor = {
    'Free': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Freemium': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Paid': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'Open Source': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'GitHub': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'Google Colab': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  }[tool.pricingModel] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  
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
              <ToolImage
                tool={{
                  name: tool.name,
                  screenshotUrl: tool.screenshotUrl,
                  url: tool.url,
                  tags: tool.tags
                }}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                width={400}
                height={240}
              />
              
              {/* Overlay Elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Badges */}
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                {/* Special Offer Badge */}
                {tool.specialOffer && (
                  <div className="bg-gradient-to-r from-neon-magenta to-electric-blue rounded-full p-1">
                    <Gift className="w-3 h-3 text-white" />
                  </div>
                )}
                
                {/* Curator Pick Badge */}
                {tool.isCuratorPick && (
                  <div className="bg-gradient-to-r from-electric-blue to-cyber-purple rounded-full p-1">
                    <Sparkles className="w-3 h-3 text-white fill-current" />
                  </div>
                )}
                
                {/* Editor's Pick Badge (legacy) */}
                {tool.isEditorsPick && (
                  <div className="bg-gradient-to-r from-electric-blue to-neon-magenta rounded-full p-1">
                    <Star className="w-3 h-3 text-white fill-current" />
                  </div>
                )}
                
                {/* Consciousness Warning */}
                {tool.consciousnessWarning && (
                  <div className={`rounded-full p-1 ${tool.consciousnessWarning.level === 'high' ? 'bg-red-500' : tool.consciousnessWarning.level === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'}`}>
                    <AlertTriangle className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
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

          {/* Special Offer Banner */}
          {tool.specialOffer && (
            <div className="mb-3 p-3 bg-gradient-to-r from-neon-magenta/10 to-electric-blue/10 border border-neon-magenta/30 rounded-lg">
              <div className="flex items-start gap-2">
                <Gift className="w-4 h-4 text-neon-magenta mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-xs text-neon-magenta font-semibold mb-1">
                    🔥 EXCLUSIVE OFFER
                  </div>
                  <div className="text-xs text-white/90 leading-relaxed">
                    {tool.specialOffer.description}
                  </div>
                  {tool.specialOffer.code && (
                    <div className="mt-2 flex items-center gap-2">
                      <code className="text-xs bg-neon-magenta/20 text-neon-magenta px-2 py-1 rounded font-mono">
                        {tool.specialOffer.code}
                      </code>
                      {tool.specialOffer.discount && (
                        <span className="text-xs text-electric-blue font-medium">
                          {tool.specialOffer.discount}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Consciousness Warning */}
          {tool.consciousnessWarning && (
            <div className={`mb-3 p-2 border rounded-lg ${
              tool.consciousnessWarning.level === 'high' 
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : tool.consciousnessWarning.level === 'medium'
                ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
            }`}>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium">{tool.consciousnessWarning.message}</p>
                  <p className="text-xs opacity-80 mt-1">{tool.consciousnessWarning.reason}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tags and Pricing */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Pricing Model Badge */}
            <Badge
              variant="outline"
              className={`text-xs ${pricingColor}`}
            >
              {tool.pricingModel}
            </Badge>
            
            {/* Tags */}
            {(tool.tags || []).slice(0, 3).map((tag, tagIndex) => (
              <Badge
                key={tagIndex}
                variant="secondary"
                className="bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Bottom section with voting and action */}
          <div className="flex items-center justify-between">
            {/* Voting system - Upvote only */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('up')}
                disabled={isVoting}
                className={`h-8 px-3 flex items-center gap-1 ${
                  tool.votes?.userVote === 'up' 
                    ? 'text-electric-blue bg-electric-blue/20' 
                    : 'text-white/60 hover:text-electric-blue hover:bg-electric-blue/10'
                }`}
              >
                <ChevronUp className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {tool.votes?.upvotes || 0}
                </span>
              </Button>
            </div>

            {/* Visit Tool Button */}
            <Button
              size="sm"
              className="bg-gradient-to-r from-electric-blue to-neon-magenta hover:from-electric-blue/80 hover:to-neon-magenta/80 text-white font-medium px-4 h-8 group/btn"
              asChild
            >
              <Link href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Visit Tool
                <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}