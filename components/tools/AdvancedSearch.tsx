"use client"

import { useState, useCallback, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Search, Filter, X, Star } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tool, PricingModel, ToolCategory } from '@/types'
import { 
  searchTools, 
  filterToolsByPricing, 
  filterToolsByTags, 
  filterToolsByConsciousness,
  filterVerifiedTools,
  filterCuratorPicks,
  sortToolsByVotes,
  sortToolsByPopularity,
  sortToolsByTrending,
  sortToolsByConsciousness,
  sortToolsByDate,
  sortToolsByName
} from '@/lib/tool-utils'

interface AdvancedSearchProps {
  tools: Tool[]
  onFilter: (filteredTools: Tool[]) => void
  className?: string
}

interface FilterState {
  query: string
  selectedTags: string[]
  selectedPricing: PricingModel[]
  minConsciousness: number
  onlyVerified: boolean
  onlyCuratorPicks: boolean
  sortBy: string
}

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'popularity', label: 'Most Popular' },
  { value: 'trending', label: 'Trending' },
  { value: 'votes', label: 'Most Upvoted' },
  { value: 'consciousness', label: 'Highest Consciousness' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' }
]

const PRICING_OPTIONS: PricingModel[] = ['Free', 'Freemium', 'Paid', 'Open Source', 'GitHub', 'Google Colab']

export function AdvancedSearch({ tools, onFilter, className = '' }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    selectedTags: [],
    selectedPricing: [],
    minConsciousness: 1,
    onlyVerified: false,
    onlyCuratorPicks: false,
    sortBy: 'relevance'
  })
  
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // Get all available tags from tools
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>()
    tools.forEach(tool => {
      tool.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [tools])

  // Apply all filters and sorting
  const filteredTools = useMemo(() => {
    let result = tools

    // Text search
    if (filters.query.trim()) {
      result = searchTools(result, filters.query)
    }

    // Tag filter
    if (filters.selectedTags.length > 0) {
      result = filterToolsByTags(result, filters.selectedTags)
    }

    // Pricing filter
    if (filters.selectedPricing.length > 0) {
      result = filterToolsByPricing(result, filters.selectedPricing)
    }

    // Consciousness filter
    if (filters.minConsciousness > 1) {
      result = filterToolsByConsciousness(result, filters.minConsciousness)
    }

    // Verified filter
    if (filters.onlyVerified) {
      result = filterVerifiedTools(result)
    }

    // Curator picks filter
    if (filters.onlyCuratorPicks) {
      result = filterCuratorPicks(result)
    }

    // Sorting
    switch (filters.sortBy) {
      case 'popularity':
        result = sortToolsByPopularity(result)
        break
      case 'trending':
        result = sortToolsByTrending(result)
        break
      case 'votes':
        result = sortToolsByVotes(result)
        break
      case 'consciousness':
        result = sortToolsByConsciousness(result)
        break
      case 'newest':
        result = sortToolsByDate(result, 'newest')
        break
      case 'oldest':
        result = sortToolsByDate(result, 'oldest')
        break
      case 'name-asc':
        result = sortToolsByName(result, 'asc')
        break
      case 'name-desc':
        result = sortToolsByName(result, 'desc')
        break
      default:
        // Relevance - if there's a search query, keep search order, otherwise use popularity
        if (!filters.query.trim()) {
          result = sortToolsByPopularity(result)
        }
    }

    return result
  }, [tools, filters])

  // Update parent component when filters change
  const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
  }, [filters])

  // Apply filters to parent
  useMemo(() => {
    onFilter(filteredTools)
  }, [filteredTools, onFilter])

  const handleTagToggle = (tag: string) => {
    const newTags = filters.selectedTags.includes(tag)
      ? filters.selectedTags.filter(t => t !== tag)
      : [...filters.selectedTags, tag]
    handleFilterChange({ selectedTags: newTags })
  }

  const handlePricingToggle = (pricing: PricingModel) => {
    const newPricing = filters.selectedPricing.includes(pricing)
      ? filters.selectedPricing.filter(p => p !== pricing)
      : [...filters.selectedPricing, pricing]
    handleFilterChange({ selectedPricing: newPricing })
  }

  const clearAllFilters = () => {
    setFilters({
      query: '',
      selectedTags: [],
      selectedPricing: [],
      minConsciousness: 1,
      onlyVerified: false,
      onlyCuratorPicks: false,
      sortBy: 'relevance'
    })
  }

  const activeFilterCount = 
    filters.selectedTags.length + 
    filters.selectedPricing.length + 
    (filters.minConsciousness > 1 ? 1 : 0) +
    (filters.onlyVerified ? 1 : 0) +
    (filters.onlyCuratorPicks ? 1 : 0)

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search AI tools..."
          value={filters.query}
          onChange={(e) => handleFilterChange({ query: e.target.value })}
          className="pl-10 h-12 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
        />
      </div>

      {/* Filter controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>

          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4 mr-1" />
              Clear all
            </Button>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Sort by:</span>
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange({ sortBy: value })}>
            <SelectTrigger className="w-40 bg-gray-900/50 border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Advanced filters */}
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-900/30 border border-gray-700 rounded-lg">
            
            {/* Tags filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-white">Categories</h3>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {availableTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={filters.selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      filters.selectedTags.includes(tag)
                        ? 'bg-electric-blue text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Pricing filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-white">Pricing</h3>
              <div className="space-y-2">
                {PRICING_OPTIONS.map(pricing => (
                  <label key={pricing} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={filters.selectedPricing.includes(pricing)}
                      onCheckedChange={() => handlePricingToggle(pricing)}
                    />
                    <span className="text-sm text-gray-300">{pricing}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Consciousness and quality filters */}
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white">Min Consciousness Score</h3>
                <div className="space-y-2">
                  <Slider
                    value={[filters.minConsciousness]}
                    onValueChange={([value]) => handleFilterChange({ minConsciousness: value })}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>1</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < filters.minConsciousness
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span>5</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={filters.onlyVerified}
                    onCheckedChange={(checked) => handleFilterChange({ onlyVerified: !!checked })}
                  />
                  <span className="text-sm text-gray-300">Verified tools only</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={filters.onlyCuratorPicks}
                    onCheckedChange={(checked) => handleFilterChange({ onlyCuratorPicks: !!checked })}
                  />
                  <span className="text-sm text-gray-300">Curator's picks only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="text-center text-sm text-gray-400">
            Showing {filteredTools.length} of {tools.length} tools
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}