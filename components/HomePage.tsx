"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Footer 
} from "@/components/layout"
import { SubmitToolCTA } from "@/components/SubmitToolCTA"
import { NewsletterModal } from "@/components/newsletter-modal"
import { sortToolsByVotes } from "@/lib/tools"
import { ToolCard } from "@/components/tools"
import { Search, X } from "lucide-react"
import { Tool } from "@/types"

interface HomePageProps {
  initialTools: Tool[]
}

export default function HomePage({ initialTools }: HomePageProps) {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [toolVotes, setToolVotes] = useState<Record<string, { upvotes: number; downvotes: number; userVote?: 'up' | 'down' | null }>>({})

  // Get all unique tags for filtering
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    initialTools.forEach(tool => {
      tool.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [initialTools])

  // Load votes from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedVotes = localStorage.getItem('mode_collapse_tool_votes')
      if (savedVotes) {
        try {
          setToolVotes(JSON.parse(savedVotes))
        } catch (error) {
          console.error('Error parsing saved votes:', error)
        }
      }
    }
  }, [])

  // Filter and search tools
  const filteredTools = useMemo(() => {
    // Merge tools with live vote data
    const toolsWithLiveVotes = initialTools.map(tool => {
      const liveVoteData = toolVotes[tool.slug]
      if (liveVoteData) {
        return {
          ...tool,
          votes: {
            upvotes: liveVoteData.upvotes,
            downvotes: liveVoteData.downvotes,
            userVote: liveVoteData.userVote
          }
        }
      }
      return tool
    })

    let filtered = toolsWithLiveVotes

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.summary.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Apply tag filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter(tool =>
        activeFilters.some(filter => tool.tags.includes(filter))
      )
    }

    return sortToolsByVotes(filtered)
  }, [initialTools, searchQuery, activeFilters, toolVotes])

  // Get top 3 featured tools (highest voted)
  const featuredTools = useMemo(() => {
    return filteredTools.slice(0, 3)
  }, [filteredTools])

  // Get remaining tools for the main grid
  const remainingTools = useMemo(() => {
    return filteredTools.slice(3)
  }, [filteredTools])

  const toggleFilter = (tag: string) => {
    setActiveFilters(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleVote = useCallback(async (toolSlug: string, vote: 'up' | 'down') => {
    setToolVotes(prev => {
      const tool = initialTools.find(t => t.slug === toolSlug)
      const currentVotes = prev[toolSlug] || {
        upvotes: tool?.votes?.upvotes || 0,
        downvotes: tool?.votes?.downvotes || 0,
        userVote: null
      }

      let newVotes = { ...currentVotes }

      // Handle vote logic - only allow upvotes, remove downvote functionality
      if (vote === 'up') {
        if (currentVotes.userVote === 'up') {
          // Remove upvote if clicking same button
          newVotes.upvotes--
          newVotes.userVote = null
        } else {
          // Add upvote
          newVotes.upvotes++
          newVotes.userVote = 'up'
        }
      }

      const updatedVotes = { ...prev, [toolSlug]: newVotes }
      
      // Persist to localStorage (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem('mode_collapse_tool_votes', JSON.stringify(updatedVotes))
      }
      
      return updatedVotes
    })
  }, [initialTools])

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#0a0a0f', background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)' }}>
      {/* Hero Header */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-geometric text-4xl md:text-6xl font-bold mb-6">
            Consciousness-Expanding{" "}
            <span className="gradient-text-primary" style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AI Tools
            </span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-12">
            Escape the algorithmic trance. Every tool tested by humans who understand AI mastery.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5 group-focus-within:text-electric-blue transition-colors pointer-events-none" />
              <Input
                type="text"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 py-4 bg-cyber-purple/30 border-cyber-purple/50 text-white placeholder:text-white/50 focus:border-electric-blue focus:ring-electric-blue/50 focus:ring-2 transition-all duration-200 text-lg shadow-lg backdrop-blur-sm"
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white hover:bg-cyber-purple/30 p-1 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            {searchQuery && (
              <div className="mt-2 text-sm text-white/60">
                Found {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} 
                {searchQuery && (
                  <span> matching "{searchQuery}"</span>
                )}
              </div>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={activeFilters.includes(tag) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter(tag)}
                className={
                  activeFilters.includes(tag)
                    ? "bg-gradient-to-r from-electric-blue to-neon-magenta text-white border-0"
                    : "border-cyber-purple/50 text-white/70 hover:text-white hover:border-electric-blue/50"
                }
              >
                {tag}
                {activeFilters.includes(tag) && (
                  <Badge variant="secondary" className="ml-2 bg-white/20 text-white text-xs">
                    {filteredTools.filter(tool => tool.tags.includes(tag)).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools - Top 3 */}
      {featuredTools.length > 0 && (
        <section className="pb-8 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-geometric text-2xl md:text-3xl font-bold mb-8 text-center">
              Most{" "}
              <span className="gradient-text-primary" style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Upvoted
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTools.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  tool={tool}
                  showThumbnail={true}
                  variant="featured"
                  onVote={handleVote}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Tools Grid */}
      {remainingTools.length > 0 && (
        <section className="py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-geometric text-2xl md:text-3xl font-bold mb-8 text-center">
              All{" "}
              <span className="gradient-text-primary" style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Tools
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingTools.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  tool={tool}
                  showThumbnail={true}
                  variant="default"
                  onVote={handleVote}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredTools.length === 0 && (
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
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
        </section>
      )}

      {/* Submit Tool CTA */}
      <SubmitToolCTA />

      {/* Newsletter CTA */}
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