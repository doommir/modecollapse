// Core data types for Mode Collapse

export interface PromptTip {
  title: string;
  snippet: string;
}

export type PricingModel = 'Free' | 'Freemium' | 'Paid' | 'Open Source' | 'GitHub' | 'Google Colab';
export type WarningLevel = 'low' | 'medium' | 'high';

export interface ConsciousnessWarning {
  level: WarningLevel;
  message: string;
  reason: string;
}

export interface VoteStats {
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
}

export interface Tool {
  slug: string;
  name: string;
  summary: string;
  description: string;
  url: string;
  tags: string[];
  consciousnessScore: number;
  curatorNote: string;
  promptTips: PromptTip[];
  featured?: boolean;
  screenshotUrl?: string;
  // New FutureTools-inspired features
  pricingModel: PricingModel;
  dateAdded: string;
  isCuratorPick?: boolean;
  specialOffer?: {
    code: string;
    description: string;
    url?: string;
  };
  consciousnessWarning?: ConsciousnessWarning;
  votes: VoteStats;
}

// UI component props
export interface ToolCardProps {
  tool: Tool & {
    icon?: React.ReactNode;
    isEditorsPick?: boolean;
    href?: string;
  };
  showThumbnail?: boolean;
  variant?: "default" | "featured";
  onVote?: (toolSlug: string, vote: 'up' | 'down') => void;
}

export interface ToolSearchBarProps {
  tools: Tool[];
  onFilter: (filteredTools: Tool[]) => void;
  placeholder?: string;
  className?: string;
}

// Form submission types
export interface ToolSubmissionData {
  name: string;
  url: string;
  description: string;
  tags: string[];
  category: string;
  submitterEmail?: string;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Legacy tool interface for compatibility with existing pages
export interface LegacyTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  href: string;
  isEditorsPick?: boolean;
  dateAdded: string;
  screenshotUrl?: string;
}