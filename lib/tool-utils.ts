import { Tool } from '@/types';

// Tool filtering and sorting utilities for production
export function filterToolsByPricing(tools: Tool[], pricingModels: string[]): Tool[] {
  if (pricingModels.length === 0) return tools;
  return tools.filter(tool => pricingModels.includes(tool.pricingModel));
}

export function filterToolsByTags(tools: Tool[], tags: string[]): Tool[] {
  if (tags.length === 0) return tools;
  return tools.filter(tool => 
    tags.some(tag => tool.tags.includes(tag))
  );
}

export function filterToolsByConsciousness(tools: Tool[], minScore: number): Tool[] {
  return tools.filter(tool => tool.consciousnessScore >= minScore);
}

export function filterVerifiedTools(tools: Tool[]): Tool[] {
  return tools.filter(tool => tool.isVerified);
}

export function filterCuratorPicks(tools: Tool[]): Tool[] {
  return tools.filter(tool => tool.isCuratorPick);
}

export function filterHealthyTools(tools: Tool[]): Tool[] {
  return tools.filter(tool => tool.linkHealth !== 'broken');
}

export function searchTools(tools: Tool[], query: string): Tool[] {
  if (!query.trim()) return tools;
  
  const normalizedQuery = query.toLowerCase();
  
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(normalizedQuery) ||
    tool.summary.toLowerCase().includes(normalizedQuery) ||
    tool.description.toLowerCase().includes(normalizedQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(normalizedQuery)) ||
    tool.curatorNote.toLowerCase().includes(normalizedQuery)
  );
}

// Sorting functions
export function sortToolsByVotes(tools: Tool[]): Tool[] {
  return [...tools].sort((a, b) => {
    const aScore = a.votes.upvotes - a.votes.downvotes;
    const bScore = b.votes.upvotes - b.votes.downvotes;
    return bScore - aScore;
  });
}

export function sortToolsByPopularity(tools: Tool[]): Tool[] {
  return [...tools].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
}

export function sortToolsByTrending(tools: Tool[]): Tool[] {
  return [...tools].sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0));
}

export function sortToolsByConsciousness(tools: Tool[]): Tool[] {
  return [...tools].sort((a, b) => b.consciousnessScore - a.consciousnessScore);
}

export function sortToolsByDate(tools: Tool[], direction: 'newest' | 'oldest' = 'newest'): Tool[] {
  return [...tools].sort((a, b) => {
    const dateA = new Date(a.dateAdded).getTime();
    const dateB = new Date(b.dateAdded).getTime();
    return direction === 'newest' ? dateB - dateA : dateA - dateB;
  });
}

export function sortToolsByName(tools: Tool[], direction: 'asc' | 'desc' = 'asc'): Tool[] {
  return [...tools].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return direction === 'asc' 
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });
}

// Get trending tools (high trending score and recent activity)
export function getTrendingTools(tools: Tool[], limit: number = 10): Tool[] {
  const trendingThreshold = 0.6;
  const trendingTools = tools.filter(tool => 
    (tool.trendingScore || 0) >= trendingThreshold
  );
  
  return sortToolsByTrending(trendingTools).slice(0, limit);
}

// Get featured tools with balanced distribution
export function getFeaturedTools(tools: Tool[], limit: number = 12): Tool[] {
  const featured = tools.filter(tool => tool.featured);
  const curatorPicks = tools.filter(tool => tool.isCuratorPick && !tool.featured);
  const highRated = tools.filter(tool => 
    tool.consciousnessScore >= 4 && !tool.featured && !tool.isCuratorPick
  );
  
  // Balance the selection
  const featuredCount = Math.min(featured.length, Math.ceil(limit * 0.4));
  const picksCount = Math.min(curatorPicks.length, Math.ceil(limit * 0.4));
  const remainingCount = limit - featuredCount - picksCount;
  
  return [
    ...featured.slice(0, featuredCount),
    ...curatorPicks.slice(0, picksCount),
    ...sortToolsByConsciousness(highRated).slice(0, remainingCount)
  ];
}

// Analytics helpers
export function getToolStats(tools: Tool[]) {
  const totalTools = tools.length;
  const verifiedTools = tools.filter(tool => tool.isVerified).length;
  const freeTools = tools.filter(tool => tool.pricingModel === 'Free').length;
  const totalVotes = tools.reduce((sum, tool) => sum + tool.votes.upvotes, 0);
  const avgConsciousness = tools.reduce((sum, tool) => sum + tool.consciousnessScore, 0) / totalTools;
  
  const categoryCounts = tools.reduce((acc, tool) => {
    if (tool.category) {
      acc[tool.category] = (acc[tool.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalTools,
    verifiedTools,
    freeTools,
    totalVotes,
    avgConsciousness: Math.round(avgConsciousness * 10) / 10,
    categoryCounts
  };
}

// Recommendation engine (simple version)
export function getRecommendedTools(tools: Tool[], baseTool: Tool, limit: number = 5): Tool[] {
  const recommendations = tools
    .filter(tool => tool.slug !== baseTool.slug)
    .map(tool => {
      let score = 0;
      
      // Tag similarity
      const commonTags = tool.tags.filter(tag => baseTool.tags.includes(tag));
      score += commonTags.length * 2;
      
      // Consciousness score proximity
      const consciousnessDiff = Math.abs(tool.consciousnessScore - baseTool.consciousnessScore);
      score += Math.max(0, 5 - consciousnessDiff);
      
      // Category match
      if (tool.category === baseTool.category) {
        score += 3;
      }
      
      // Curator picks get bonus
      if (tool.isCuratorPick) {
        score += 2;
      }
      
      // Trending tools get bonus
      if ((tool.trendingScore || 0) > 0.7) {
        score += 1;
      }
      
      return { tool, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.tool);
  
  return recommendations;
}