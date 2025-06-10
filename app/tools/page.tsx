"use client"

import type React from "react"
import Link from "next/link"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Brain,
  Zap,
  Code,
  Palette,
  MessageSquare,
  ExternalLink,
  Search,
  Video,
  Mic,
  FileText,
  Camera,
  Music,
  Globe,
  Linkedin,
  TrendingUp,
  Star,
} from "lucide-react"

interface Tool {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  tags: string[]
  href: string
  isEditorsPick?: boolean
  dateAdded: string
}

const allTools: Tool[] = [
  {
    id: "1",
    name: "Claude Artifacts",
    description: "Interactive code generation with real-time preview and execution",
    icon: <Brain className="w-6 h-6" />,
    tags: ["GPT-4o", "Free", "Coding"],
    href: "#",
    isEditorsPick: true,
    dateAdded: "2024-01-15",
  },
  {
    id: "2",
    name: "Midjourney Alpha",
    description: "Next-generation image synthesis for visual storytelling",
    icon: <Palette className="w-6 h-6" />,
    tags: ["Creative", "Subscription", "Image Gen"],
    href: "#",
    isEditorsPick: true,
    dateAdded: "2024-01-10",
  },
  {
    id: "3",
    name: "Cursor AI",
    description: "AI-powered code editor that thinks alongside you",
    icon: <Zap className="w-6 h-6" />,
    tags: ["Coding", "Automation", "Subscription"],
    href: "#",
    dateAdded: "2024-01-08",
  },
  {
    id: "4",
    name: "Perplexity Pro",
    description: "Research assistant that cites real sources and facts",
    icon: <MessageSquare className="w-6 h-6" />,
    tags: ["GPT-4o", "Research", "Subscription"],
    href: "#",
    dateAdded: "2024-01-05",
  },
  {
    id: "5",
    name: "RunwayML Gen-3",
    description: "Video generation from text prompts and images",
    icon: <Video className="w-6 h-6" />,
    tags: ["Video", "Creative", "Subscription"],
    href: "#",
    isEditorsPick: true,
    dateAdded: "2024-01-12",
  },
  {
    id: "6",
    name: "GitHub Copilot",
    description: "Your AI pair programmer for faster development",
    icon: <Code className="w-6 h-6" />,
    tags: ["Coding", "Automation", "Subscription"],
    href: "#",
    dateAdded: "2024-01-03",
  },
  {
    id: "7",
    name: "ElevenLabs Voice",
    description: "Realistic voice synthesis and cloning technology",
    icon: <Mic className="w-6 h-6" />,
    tags: ["Audio", "Creative", "Subscription"],
    href: "#",
    dateAdded: "2024-01-14",
  },
  {
    id: "8",
    name: "Notion AI",
    description: "Writing assistant integrated into your workspace",
    icon: <FileText className="w-6 h-6" />,
    tags: ["Writing", "Free", "Automation"],
    href: "#",
    dateAdded: "2024-01-07",
  },
  {
    id: "9",
    name: "Stable Diffusion XL",
    description: "Open-source image generation with fine-tuned control",
    icon: <Camera className="w-6 h-6" />,
    tags: ["Creative", "Free", "Image Gen"],
    href: "#",
    dateAdded: "2024-01-11",
  },
  {
    id: "10",
    name: "Suno AI",
    description: "Generate complete songs from text descriptions",
    icon: <Music className="w-6 h-6" />,
    tags: ["Audio", "Creative", "Free"],
    href: "#",
    isEditorsPick: true,
    dateAdded: "2024-01-13",
  },
  {
    id: "11",
    name: "Anthropic Claude",
    description: "Constitutional AI for safe and helpful conversations",
    icon: <Brain className="w-6 h-6" />,
    tags: ["GPT-4o", "Research", "Free"],
    href: "#",
    dateAdded: "2024-01-09",
  },
  {
    id: "12",
    name: "Vercel v0",
    description: "Generate React components from text descriptions",
    icon: <Globe className="w-6 h-6" />,
    tags: ["Coding", "Free", "Automation"],
    href: "#",
    dateAdded: "2024-01-06",
  },
]

const filterOptions = [
  "GPT-4o",
  "Free",
  "Creative",
  "Coding",
  "Automation",
  "Video",
  "Subscription",
  "Audio",
  "Writing",
  "Research",
  "Image Gen",
]

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "recent", label: "Recently Added" },
  { value: "editors", label: "Editor's Pick" },
]

const trendingTags = ["GPT-4o", "Creative", "Coding", "Video", "Free"]

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("relevance")

  const filteredAndSortedTools = useMemo(() => {
    const filtered = allTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilters = activeFilters.length === 0 || activeFilters.some((filter) => tool.tags.includes(filter))

      return matchesSearch && matchesFilters
    })

    // Sort tools
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        break
      case "editors":
        filtered.sort((a, b) => {
          if (a.isEditorsPick && !b.isEditorsPick) return -1
          if (!a.isEditorsPick && b.isEditorsPick) return 1
          return 0
        })
        break
      default:
        // Keep original order for relevance
        break
    }

    return filtered
  }, [searchQuery, activeFilters, sortBy])

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  return (
    <div className="min-h-screen bg-deep-purple text-white">
      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-40 bg-dark-purple/90 backdrop-blur-sm border-b border-cyber-purple/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Search and Sort */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-deep-purple border-cyber-purple/50 text-white placeholder:text-white/40"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 bg-deep-purple border-cyber-purple/50 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dark-purple border-cyber-purple/50">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-cyber-purple/20">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <Button
                key={filter}
                variant={activeFilters.includes(filter) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter(filter)}
                className={
                  activeFilters.includes(filter)
                    ? "bg-gradient-to-r from-electric-blue to-neon-magenta text-white border-0"
                    : "border-cyber-purple/50 text-white/70 hover:text-white hover:border-electric-blue/50"
                }
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-white/60">
                {filteredAndSortedTools.length} tools found
                {activeFilters.length > 0 && <span className="ml-2">• Filtered by: {activeFilters.join(", ")}</span>}
              </p>
            </div>

            {/* Tool Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedTools.map((tool) => (
                <Card
                  key={tool.id}
                  className={`bg-dark-purple/50 border-cyber-purple/30 hover:border-electric-blue/50 transition-all duration-300 group hover:scale-[1.02] ${
                    tool.isEditorsPick ? "ring-1 ring-neon-magenta/30 shadow-lg shadow-neon-magenta/10" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <Link
                      href={`/tools/${tool.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9-]/g, "")}`}
                      className="block"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-electric-blue group-hover:text-neon-magenta transition-colors">
                            {tool.icon}
                          </div>
                          <h3 className="font-geometric font-semibold text-lg">{tool.name}</h3>
                        </div>
                        {tool.isEditorsPick && (
                          <div className="flex items-center gap-1 text-neon-magenta">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-xs font-medium">Pick</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-white/70 mb-4 text-sm leading-relaxed">{tool.description}</p>

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

                      {/* Action */}
                      <div className="text-electric-blue hover:text-white font-medium group/btn flex items-center">
                        Learn More
                        <ExternalLink className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredAndSortedTools.length === 0 && (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="font-geometric text-xl font-semibold mb-2">No tools found</h3>
                <p className="text-white/60 mb-4">Try adjusting your search or filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveFilters([])
                  }}
                  className="border-cyber-purple/50 text-white hover:bg-cyber-purple/20"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-80 space-y-6">
            {/* Curator's Note */}
            <Card className="bg-gradient-to-br from-dark-purple/80 to-cyber-purple/20 border-cyber-purple/30">
              <CardContent className="p-6">
                <h3 className="font-geometric text-lg font-semibold mb-3 text-electric-blue">Curator's Note</h3>
                <blockquote className="text-white/80 italic text-sm leading-relaxed">
                  "Consciousness isn't downloaded. It's chosen. Each tool here has been tested by awakened minds who
                  understand that true intelligence amplifies awareness, not dependency."
                </blockquote>
                <div className="mt-4 text-right">
                  <span className="text-neon-magenta text-xs">— The Collective</span>
                </div>
              </CardContent>
            </Card>

            {/* Trending Tags */}
            <Card className="bg-dark-purple/50 border-cyber-purple/30">
              <CardContent className="p-6">
                <h3 className="font-geometric text-lg font-semibold mb-4 text-electric-blue">Trending Now</h3>
                <div className="space-y-2">
                  {trendingTags.map((tag, index) => (
                    <button
                      key={tag}
                      onClick={() => toggleFilter(tag)}
                      className="flex items-center justify-between w-full text-left p-2 rounded-lg hover:bg-cyber-purple/20 transition-colors group"
                    >
                      <span className="text-white/80 group-hover:text-white">{tag}</span>
                      <Badge variant="secondary" className="bg-cyber-purple/20 text-cyber-purple text-xs">
                        {allTools.filter((tool) => tool.tags.includes(tag)).length}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Email Signup */}
            <Card className="bg-gradient-to-br from-neon-magenta/10 to-electric-blue/10 border-electric-blue/30">
              <CardContent className="p-6">
                <h3 className="font-geometric text-lg font-semibold mb-3 text-electric-blue">Weekly Drops</h3>
                <p className="text-white/70 text-sm mb-4">
                  Want new tools every week? Join the list and stay ahead of the algorithmic curve.
                </p>
                <div className="space-y-3">
                  <Input
                    placeholder="Enter your email"
                    className="bg-deep-purple border-cyber-purple/50 text-white placeholder:text-white/40"
                  />
                  <Button className="w-full bg-gradient-to-r from-electric-blue to-neon-magenta hover:from-electric-blue/80 hover:to-neon-magenta/80 text-white">
                    Join the Awakening
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-cyber-purple/20 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-electric-blue" />
              <span className="font-geometric text-xl font-bold">Mode Collapse</span>
            </div>

            <nav className="flex flex-wrap justify-center gap-6 text-white/70">
              <a href="/" className="hover:text-electric-blue transition-colors">
                Home
              </a>
              <a href="/tools" className="hover:text-electric-blue transition-colors">
                Tools
              </a>
              <a href="#" className="hover:text-electric-blue transition-colors">
                About
              </a>
              <a href="#" className="hover:text-electric-blue transition-colors flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> TikTok
              </a>
              <a href="#" className="hover:text-electric-blue transition-colors flex items-center gap-1">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </nav>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-cyber-purple/20">
            <p className="text-white/40 text-sm font-geometric">Only the awake can see the tools for what they are.</p>
          </div>
        </div>
      </footer>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-electric-blue/30 rounded-full animate-float"></div>
        <div
          className="absolute top-40 right-20 w-1 h-1 bg-neon-magenta/30 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-cyber-purple/30 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-1 h-1 bg-electric-blue/20 rounded-full animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>
    </div>
  )
}
