// Core data types for Mode Collapse

export interface PromptTip {
  title: string;
  snippet: string;
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