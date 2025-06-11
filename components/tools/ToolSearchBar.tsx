"use client"

import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

import type { ToolSearchBarProps } from "@/types"

export function ToolSearchBar({ 
  tools, 
  onFilter, 
  placeholder = "Search AI tools...",
  className = ""
}: ToolSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) {
      return tools
    }

    const query = searchQuery.toLowerCase().trim()
    
    return tools.filter((tool) => {
      // Search in name
      const nameMatch = tool.name.toLowerCase().includes(query)
      
      // Search in summary/description
      const summaryMatch = tool.summary?.toLowerCase().includes(query) || 
                          tool.description?.toLowerCase().includes(query)
      
      // Search in tags
      const tagsMatch = tool.tags?.some((tag: string) => 
        tag.toLowerCase().includes(query)
      )
      
      return nameMatch || summaryMatch || tagsMatch
    })
  }, [tools, searchQuery])

  // Call onFilter whenever filtered results change
  useMemo(() => {
    onFilter(filteredTools)
  }, [filteredTools, onFilter])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className={`relative ${className} z-30`}>
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5 group-focus-within:text-electric-blue transition-colors pointer-events-none" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-12 pr-12 py-4 bg-cyber-purple/30 border-cyber-purple/50 text-white placeholder:text-white/50 focus:border-electric-blue focus:ring-electric-blue/50 focus:ring-2 transition-all duration-200 text-lg shadow-lg backdrop-blur-sm relative z-30"
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white hover:bg-cyber-purple/30 p-1 h-8 w-8 z-40"
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
  )
}