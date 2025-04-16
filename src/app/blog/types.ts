export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  slug: string;
  thumbnail?: string; // Optional thumbnail
  // Add other metadata fields if needed, e.g., tags, relatedPosts (by slug)
} 