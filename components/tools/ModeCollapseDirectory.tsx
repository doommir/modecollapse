"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Search,
  Filter,
  Star,
  ExternalLink,
  Zap,
  Brain,
  Code,
  Mic,
  Image,
  FileText,
  Users,
  Sparkles,
  TrendingUp,
  Clock,
  DollarSign,
  Tag,
  Grid,
  List,
  ChevronDown,
  X,
  Heart,
  Share2,
  Bookmark,
  Eye,
  ArrowRight,
  AlertTriangle,
  Shield,
  Crown,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tool, ToolCategory, PricingModel } from "@/types";
import { PricingBadge } from "./PricingBadge";
import { VerificationBadge } from "./VerificationBadge";

// Hook for expandable functionality
function useExpandable(initialState = false) {
  const [isExpanded, setIsExpanded] = useState(initialState);
  const springConfig = { stiffness: 300, damping: 30 };
  const animatedHeight = useSpring(0, springConfig);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return { isExpanded, toggleExpand, animatedHeight };
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
  color: string;
}

interface ModeCollapseDirectoryProps {
  tools?: Tool[];
  categories?: Category[];
  className?: string;
}

// Mode Collapse categories with consciousness-focused mapping
const defaultCategories: Category[] = [
  { id: "all", name: "All Tools", icon: Grid, count: 3400, color: "bg-blue-500" },
  { id: "Writing", name: "Writing", icon: FileText, count: 245, color: "bg-green-500" },
  { id: "Visual", name: "Visual", icon: Image, count: 189, color: "bg-purple-500" },
  { id: "Coding", name: "Coding", icon: Code, count: 156, color: "bg-orange-500" },
  { id: "Audio", name: "Audio", icon: Mic, count: 98, color: "bg-pink-500" },
  { id: "Productivity", name: "Productivity", icon: Zap, count: 312, color: "bg-yellow-500" },
  { id: "Research", name: "Research", icon: Brain, count: 167, color: "bg-indigo-500" },
  { id: "Marketing", name: "Marketing", icon: TrendingUp, count: 203, color: "bg-red-500" },
  { id: "Analysis", name: "Analysis", icon: Users, count: 134, color: "bg-cyan-500" },
];

// Tool Card Component
function ToolCard({ 
  tool, 
  onBookmark, 
  onShare, 
  onVote 
}: { 
  tool: Tool; 
  onBookmark: (slug: string) => void;
  onShare: (slug: string) => void;
  onVote: (slug: string, voteType: 'up' | 'down') => void;
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { isExpanded, toggleExpand, animatedHeight } = useExpandable();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      animatedHeight.set(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded, animatedHeight]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(tool.slug);
  };

  const getConsciousnessColor = (score: number) => {
    if (score >= 4.5) return "text-green-600 dark:text-green-400";
    if (score >= 3.5) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getConsciousnessText = (score: number) => {
    if (score >= 4.5) return "High Consciousness";
    if (score >= 3.5) return "Moderate Awareness";
    return "Use Mindfully";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group relative overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm hover:border-border hover:shadow-lg transition-all duration-300">
        {/* Featured/Trending Badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {tool.isCuratorPick && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
              <Crown className="w-3 h-3 mr-1" />
              Curator's Pick
            </Badge>
          )}
          {tool.isVerified && (
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          {tool.trendingScore && tool.trendingScore > 0.7 && (
            <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
            onClick={handleBookmark}
          >
            <Heart className={cn("w-4 h-4", isBookmarked && "fill-red-500 text-red-500")} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
            onClick={() => onShare(tool.slug)}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        <CardHeader className="pb-3">
          {/* Tool Image */}
          <div className="w-full h-32 bg-gradient-to-br from-muted to-muted/50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            {tool.screenshotUrl ? (
              <img 
                src={tool.screenshotUrl} 
                alt={tool.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <PricingBadge pricingModel={tool.pricingModel} />
            </div>

            {/* Consciousness Score and Stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Brain className={cn("w-4 h-4", getConsciousnessColor(tool.consciousnessScore))} />
                <span className={cn("font-medium", getConsciousnessColor(tool.consciousnessScore))}>
                  {tool.consciousnessScore}/5
                </span>
                <span className="text-xs">{getConsciousnessText(tool.consciousnessScore)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{tool.votes.upvotes}</span>
              </div>
              {tool.isVerified && <VerificationBadge />}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {tool.summary || tool.description}
          </p>

          {/* Consciousness Warning */}
          {tool.consciousnessWarning && (
            <div className="flex items-center gap-2 p-2 mb-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-xs text-yellow-700 dark:text-yellow-300">
                {tool.consciousnessWarning.message}
              </span>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {tool.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tool.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{tool.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Expandable Details */}
          <motion.div
            style={{ height: animatedHeight }}
            className="overflow-hidden"
          >
            <div ref={contentRef}>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 pt-3 border-t border-border/50"
                  >
                    <div className="text-sm text-muted-foreground">
                      {tool.description}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Added {tool.dateAdded}</span>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium text-foreground">Curator Note:</span>
                      <p className="text-muted-foreground mt-1">{tool.curatorNote}</p>
                    </div>

                    {/* Prompt Tips */}
                    {tool.promptTips && tool.promptTips.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-medium text-muted-foreground">PROMPT TIPS:</span>
                        <div className="space-y-2">
                          {tool.promptTips.slice(0, 2).map((tip, idx) => (
                            <div key={idx} className="p-2 bg-muted/50 rounded text-xs">
                              <div className="font-medium">{tip.title}</div>
                              <div className="text-muted-foreground mt-1">{tip.snippet}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1">
                      {tool.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleExpand}
              className="flex-1"
            >
              {isExpanded ? "Less Info" : "More Info"}
              <ChevronDown className={cn("w-4 h-4 ml-1 transition-transform", isExpanded && "rotate-180")} />
            </Button>
            <Button 
              size="sm" 
              className="flex-1" 
              onClick={() => onVote(tool.slug, 'up')}
            >
              <Heart className="w-4 h-4 mr-1" />
              Upvote
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Category Filter Component
function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className="flex items-center gap-2"
        >
          <category.icon className="w-4 h-4" />
          {category.name}
          <Badge variant="secondary" className="ml-1 text-xs">
            {category.count}
          </Badge>
        </Button>
      ))}
    </div>
  );
}

// Main Component
export function ModeCollapseDirectory({
  tools = [],
  categories = defaultCategories,
  className,
}: ModeCollapseDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("consciousness");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // Filter and sort tools
  const filteredTools = tools
    .filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
      
      const matchesPricing = selectedPricing.length === 0 || selectedPricing.includes(tool.pricingModel);
      
      return matchesSearch && matchesCategory && matchesPricing;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "consciousness":
          return b.consciousnessScore - a.consciousnessScore;
        case "curated":
          return (b.isCuratorPick ? 1 : 0) - (a.isCuratorPick ? 1 : 0);
        case "trending":
          return (b.trendingScore || 0) - (a.trendingScore || 0);
        case "votes":
          return b.votes.upvotes - a.votes.upvotes;
        case "newest":
          return new Date(b.dateAdded || '').getTime() - new Date(a.dateAdded || '').getTime();
        default:
          return 0;
      }
    });

  const handleBookmark = (toolSlug: string) => {
    console.log("Bookmarked tool:", toolSlug);
  };

  const handleShare = (toolSlug: string) => {
    console.log("Shared tool:", toolSlug);
  };

  const handleVote = (toolSlug: string, voteType: 'up' | 'down') => {
    console.log("Voted on tool:", toolSlug, voteType);
    // TODO: Implement actual voting logic
  };

  const pricingOptions: PricingModel[] = ["Free", "Freemium", "Paid", "Open Source", "GitHub", "Google Colab"];

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Header */}
      <div className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Mode Collapse
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Escape the algorithmic trance. Discover consciousness-expanding AI tools 
              curated by humans who understand the difference between automation and awakening.
            </motion.p>
            
            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Brain className="w-5 h-5 mr-2" />
                Discover Tools Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6"
                onClick={() => setShowHowItWorks(!showHowItWorks)}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {showHowItWorks ? 'Hide Guide' : 'How It Works'}
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="flex justify-center gap-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>{filteredTools.length} Curated Tools</span>
              </div>
              <div className="flex items-center gap-1">
                <Crown className="w-4 h-4" />
                <span>{filteredTools.filter(t => t.isCuratorPick).length} Expert Picks</span>
              </div>
              <div className="flex items-center gap-1">
                <Brain className="w-4 h-4" />
                <span>Consciousness Rated</span>
              </div>
            </motion.div>

            {/* How It Works Section */}
            <AnimatePresence>
              {showHowItWorks && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 p-6 bg-muted/30 rounded-xl border border-border/50 max-w-4xl mx-auto"
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Brain className="w-6 h-6 text-blue-500" />
                    Understanding Consciousness Ratings
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400 font-bold">5</span>
                      </div>
                      <div>
                        <div className="font-medium text-green-600 dark:text-green-400">Peak Consciousness</div>
                        <p className="text-muted-foreground">Tools that enhance human agency, promote critical thinking, and expand awareness.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                        <span className="text-yellow-600 dark:text-yellow-400 font-bold">3</span>
                      </div>
                      <div>
                        <div className="font-medium text-yellow-600 dark:text-yellow-400">Moderate Awareness</div>
                        <p className="text-muted-foreground">Useful tools with some limitations. Use mindfully to maintain agency.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                        <span className="text-red-600 dark:text-red-400 font-bold">1</span>
                      </div>
                      <div>
                        <div className="font-medium text-red-600 dark:text-red-400">Use With Caution</div>
                        <p className="text-muted-foreground">May encourage dependency or mindless consumption. Approach deliberately.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-background/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      💡 <strong>Our Mission:</strong> We rate tools not just on functionality, but on their potential to expand human consciousness and maintain personal agency in an age of algorithmic dependence.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Simplified Search */}
          <div className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search for AI tools by name, category, or purpose..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg bg-background/50 border-2 border-border/50 focus:border-primary/50 rounded-xl"
                />
              </div>
            </div>
            
            {/* Advanced Controls - Collapsed by default */}
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? 'Hide' : 'Show'} Filters
                {(selectedPricing.length > 0) && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedPricing.length}
                  </Badge>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="flex items-center gap-2"
              >
                {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                {viewMode === "grid" ? 'List View' : 'Grid View'}
              </Button>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border/50"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Pricing:</span>
                    {pricingOptions.map((pricing) => (
                      <Button
                        key={pricing}
                        variant={selectedPricing.includes(pricing) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedPricing(prev => 
                            prev.includes(pricing) 
                              ? prev.filter(p => p !== pricing)
                              : [...prev, pricing]
                          );
                        }}
                      >
                        <DollarSign className="w-3 h-3 mr-1" />
                        {pricing}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1 rounded-md border border-border bg-background text-sm"
                    >
                      <option value="consciousness">Consciousness Score</option>
                      <option value="curated">Curator's Picks</option>
                      <option value="trending">Trending</option>
                      <option value="votes">Most Upvoted</option>
                      <option value="newest">Newest</option>
                    </select>
                    
                    {(selectedPricing.length > 0) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedPricing([])}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Category Filter */}
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Featured Tools Section */}
        {filteredTools.filter(tool => tool.isCuratorPick).length > 0 && (
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
                <Crown className="w-8 h-8 text-yellow-500" />
                Curator's Picks
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hand-selected tools that have proven their worth in expanding consciousness and enhancing human capability.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTools.filter(tool => tool.isCuratorPick).slice(0, 6).map((tool) => (
                <ToolCard
                  key={`featured-${tool.slug}`}
                  tool={tool}
                  onBookmark={handleBookmark}
                  onShare={handleShare}
                  onVote={handleVote}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* All Tools Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-blue-500" />
                {selectedCategory === "all" ? "All Tools" : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <Badge variant="outline" className="text-sm">
                {filteredTools.length} tools
              </Badge>
            </div>
            
            {/* Sort Options */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 rounded-md border border-border bg-background text-sm"
              >
                <option value="consciousness">Consciousness Score</option>
                <option value="curated">Curator's Picks</option>
                <option value="trending">Trending</option>
                <option value="votes">Most Upvoted</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Tools Grid */}
          <motion.div
            layout
            className={cn(
              "grid gap-6",
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            )}
          >
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  tool={tool}
                  onBookmark={handleBookmark}
                  onShare={handleShare}
                  onVote={handleVote}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No consciousness-expanding tools found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or explore different categories. 
              The tools you seek may be hidden in another consciousness realm.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedPricing([]);
              }}
            >
              Clear all filters and expand awareness
            </Button>
          </motion.div>
        )}

        {/* Load More */}
        {filteredTools.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="group">
              Discover More Tools
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-border/50 bg-muted/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Break Free from the Algorithm</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Have a consciousness-expanding AI tool that deserves recognition? Submit it to our curated directory 
            and help others escape the infinite scroll of mediocrity.
          </p>
          <Button size="lg" className="group" asChild>
            <a href="/submit-tool">
              Submit Your Tool
              <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModeCollapseDirectory;