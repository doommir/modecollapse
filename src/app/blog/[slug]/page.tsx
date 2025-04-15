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
      gfm: true
    });
    
    return marked(markdown) as string;
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    return markdown; // Return original content as fallback
  }
}

// Generate static paths for all blog posts
export function generateStaticParams(): { slug: string }[] {
  return blogPosts.map(post => ({
    slug: post.slug,
  }))
}

// Use basic inline types, remove async
export default function Page({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find(post => post.slug === params.slug);
  
  // If no post is found, return a 404
  if (!post) {
    notFound();
  }
  
  // Find related posts
  const relatedPosts = post.relatedPosts
    ? post.relatedPosts
        .map(id => blogPosts.find(p => p.id === id))
        .filter((post): post is typeof blogPosts[0] => post !== undefined)
    : [];
  
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