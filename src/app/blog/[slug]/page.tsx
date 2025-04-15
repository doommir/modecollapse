import Link from 'next/link'
import { notFound } from 'next/navigation'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import SectionDivider from '@/components/SectionDivider'
import { blogPosts } from '@/data/blogPosts'
import NewsletterSignup from '@/components/NewsletterSignup'
import { marked } from 'marked'

// Convert markdown to HTML
const markdownToHtml = (markdown: string) => {
  try {
    // Configure marked to preserve whitespace
    marked.setOptions({
      breaks: true,
      gfm: true,
      pedantic: false
    });
    
    return marked(markdown) as string;
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    return markdown; // Return original content as fallback
  }
}

// Helper function to fetch a blog post from the API
async function fetchBlogPost(slug: string) {
  try {
    // In development, use the local API endpoint
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : process.env.NEXT_PUBLIC_SITE_URL || 'https://modecollapse.vercel.app';
    
    const response = await fetch(`${baseUrl}/api/blog?slug=${slug}`, {
      // Use cache: 'no-store' for always fresh data, or 'force-cache' for static data
      cache: 'no-store',
      next: { 
        // Optional: revalidate every 10 minutes
        revalidate: 600 
      }
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.post;
  } catch (error) {
    console.error(`Error fetching blog post (${slug}):`, error);
    return null;
  }
}

// Generate static paths for all blog posts
export function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Get the slug parameter directly (no need to await it)
  const slug = params.slug;
  
  // Try to fetch the post from the API first
  let post = await fetchBlogPost(slug);
  
  // If the API fails, fall back to static data
  if (!post) {
    post = blogPosts.find(post => post.slug === slug);
  }
  
  // If no post is found, return a 404
  if (!post) {
    notFound();
  }
  
  // Find related posts - first try from database, then fall back to static data
  let relatedPosts = post.relatedPosts
    ? await Promise.all(
        post.relatedPosts.map(async (id: string) => {
          // First check if the post exists in static data
          const staticPost = blogPosts.find(p => p.id === id);
          if (staticPost) return staticPost;
          
          // If not, try to fetch from the API
          const relatedPost = await fetchBlogPost(id);
          return relatedPost;
        })
      )
    : [];
  
  // Filter out any null values
  relatedPosts = relatedPosts.filter(post => post !== null);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-darkBg to-black text-textPrimary pb-20">
      {/* Header Section */}
      <ScrollRevealSection className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-sm bg-primary/10 text-primary rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-textSecondary mb-8">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-textSecondary">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </div>
      </ScrollRevealSection>
      
      <SectionDivider />
      
      {/* Blog Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main blog content */}
          <div className="lg:col-span-3">
            <ScrollRevealSection className="bg-darkBg/30 dark:bg-darkBg/30 rounded-lg p-6 mb-12 border border-textSecondary/10">
              <article className="prose prose-invert max-w-none">
                {post.id === '0' ? (
                  <div className="w-full h-72 bg-darkBg/50 rounded-lg mb-8 relative overflow-hidden">
                    <img 
                      src="/blog/mode-collapse.png" 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ) : post.id === '7' ? (
                  <div className="w-full h-72 bg-darkBg/50 rounded-lg mb-8 relative overflow-hidden">
                    <img 
                      src="/blog/viitalbeatsviral.png" 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ) : post.id === '8' ? (
                  <div className="w-full h-72 bg-darkBg/50 rounded-lg mb-8 relative overflow-hidden">
                    <img 
                      src="/blog/disruptsquare.png" 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-56 bg-darkBg/50 rounded-lg mb-8 flex items-center justify-center text-primary/30">
                    {/* In a real app, you would use an actual image */}
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                <div className="mt-12">
                  <h1 className="text-4xl font-bold text-center mb-4">{post.title}</h1>
                  <div className="flex items-center justify-center text-textSecondary text-sm mb-12">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>
                  <div 
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
                  ></div>
                </div>
              </article>
            </ScrollRevealSection>
            
            {/* Author bio */}
            <ScrollRevealSection className="bg-darkBg/30 dark:bg-darkBg/30 rounded-lg p-6 border border-textSecondary/10">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{post.author}</h3>
                  <p className="text-textSecondary text-sm">Writer & Educator</p>
                </div>
              </div>
            </ScrollRevealSection>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related posts */}
            <div className="bg-darkBg/30 dark:bg-darkBg/30 rounded-lg p-6 mb-6 border border-textSecondary/10">
              <h3 className="text-lg font-bold mb-4">Related Posts</h3>
              <div className="space-y-4">
                {relatedPosts.map(relatedPost => (
                  <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.id} className="block group">
                    <h4 className="font-medium group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-textSecondary">{relatedPost.date}</p>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Categories */}
            <div className="bg-darkBg/30 dark:bg-darkBg/30 rounded-lg p-6 border border-textSecondary/10">
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {['Education', 'AI', 'Web Development', 'Productivity', 'Content Creation'].map(category => (
                  <Link 
                    href={`/blog?category=${category}`} 
                    key={category}
                    className={`px-3 py-1 rounded-full text-sm ${
                      category === post.category 
                        ? 'bg-primary text-white' 
                        : 'bg-darkBg/50 text-textSecondary hover:bg-darkBg/70'
                    }`}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <ScrollRevealSection className="max-w-3xl mx-auto my-16">
          <NewsletterSignup 
            title="Enjoyed this article?"
            description="Subscribe to get more content like this delivered straight to your inbox."
          />
        </ScrollRevealSection>
        
        {/* Call to action */}
        <ScrollRevealSection className="mt-16 text-center">
          <Link href="/blog" className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Back to All Posts
          </Link>
        </ScrollRevealSection>
      </div>
    </div>
  )
} 