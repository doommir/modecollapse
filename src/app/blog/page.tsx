import Link from 'next/link'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import SectionDivider from '@/components/SectionDivider'
import { blogPosts } from '@/data/blogPosts'
import NewsletterSignup from '@/components/NewsletterSignup'

// Constants
const POSTS_PER_PAGE = 5

// Get unique categories
const categories = Array.from(new Set(blogPosts.map(post => post.category)))

export default function BlogPage({ 
  searchParams 
}: { 
  searchParams: { category?: string; page?: string } 
}) {
  // Parse search params
  const selectedCategory = searchParams.category || null
  const currentPage = Number(searchParams.page) || 1
  
  // Filter posts by category
  const filteredPosts = selectedCategory
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts
  
  // Calculate pagination
  const indexOfLastPost = currentPage * POSTS_PER_PAGE
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-darkBg to-black text-textPrimary">
      {/* Header Section */}
      <ScrollRevealSection className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-sm bg-primary/10 text-primary rounded-full mb-4">
            Our Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Latest Articles & Insights
          </h1>
          <p className="text-lg text-textSecondary">
            Explore our thoughts on education, technology, creativity, and more.
          </p>
        </div>
      </ScrollRevealSection>
      
      <SectionDivider />
      
      {/* Blog Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Blog posts - left column */}
          <div className="lg:col-span-3">
            {currentPosts.length > 0 ? (
              <div className="space-y-8">
                {currentPosts.map(post => (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="group block">
                    <div 
                      className="bg-darkBg/30 dark:bg-darkBg/30 rounded-lg overflow-hidden border border-textSecondary/10 hover:border-primary/30 transition-colors group"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <div className="md:col-span-1 bg-darkBg/50 h-full relative overflow-hidden">
                          {post.id === '0' ? (
                            <img 
                              src="/blog/mode-collapse.png" 
                              alt={post.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          ) : post.id === '7' ? (
                            <img 
                              src="/blog/vitalviralsquare.png" 
                              alt={post.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          ) : post.id === '8' ? (
                            <img 
                              src="/blog/disruptsquare.png" 
                              alt={post.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-40 md:h-full bg-darkBg/70 rounded-md flex items-center justify-center text-primary/30">
                              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="md:col-span-3 p-6">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-md">
                              {post.category}
                            </span>
                            <span className="text-xs text-textSecondary px-2 py-1">
                              {post.date}
                            </span>
                          </div>
                          <h2 className="text-xl font-bold text-textPrimary mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-textSecondary mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-textSecondary">
                              By {post.author}
                            </span>
                            <span className="text-primary inline-flex items-center group-hover:underline">
                              Read More
                              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-darkBg/30 dark:bg-darkBg/30 rounded-lg p-8 text-center border border-textSecondary/10">
                <h3 className="text-xl font-semibold mb-2">No Posts Found</h3>
                <p className="text-textSecondary mb-4">
                  {selectedCategory 
                    ? `There are no posts in the "${selectedCategory}" category.` 
                    : 'There are no blog posts available.'}
                </p>
                {selectedCategory && (
                  <Link
                    href="/blog"
                    className="px-4 py-2 bg-primary/20 text-primary rounded-md hover:bg-primary/30 transition-colors inline-block"
                  >
                    Clear Filter
                  </Link>
                )}
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <div className="flex space-x-2">
                  <Link
                    href={`/blog?category=${selectedCategory || ''}&page=${Math.max(1, currentPage - 1)}`}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === 1 
                        ? 'bg-darkBg/30 text-textSecondary/50 pointer-events-none' 
                        : 'bg-darkBg/50 text-textSecondary hover:bg-darkBg/70'
                    }`}
                    aria-disabled={currentPage === 1}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <Link
                      key={index}
                      href={`/blog?category=${selectedCategory || ''}&page=${index + 1}`}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === index + 1 
                          ? 'bg-primary text-white' 
                          : 'bg-darkBg/50 text-textSecondary hover:bg-darkBg/70'
                      }`}
                    >
                      {index + 1}
                    </Link>
                  ))}
                  
                  <Link
                    href={`/blog?category=${selectedCategory || ''}&page=${Math.min(totalPages, currentPage + 1)}`}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === totalPages 
                        ? 'bg-darkBg/30 text-textSecondary/50 pointer-events-none' 
                        : 'bg-darkBg/50 text-textSecondary hover:bg-darkBg/70'
                    }`}
                    aria-disabled={currentPage === totalPages}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar - right column */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <div className="bg-darkBg/30 dark:bg-darkBg/30 rounded-lg p-6 mb-6 border border-textSecondary/10">
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <Link
                    key={category}
                    href={`/blog?category=${category === selectedCategory ? '' : category}`}
                    className={`px-3 py-1 rounded-full text-sm block w-full text-left ${
                      category === selectedCategory 
                        ? 'bg-primary text-white' 
                        : 'bg-darkBg/50 text-textSecondary hover:bg-darkBg/70'
                    }`}
                  >
                    {category}
                  </Link>
                ))}
                
                {selectedCategory && (
                  <Link
                    href="/blog"
                    className="px-3 py-1 rounded-full text-sm block w-full text-left bg-darkBg/30 text-primary hover:bg-darkBg/40 mt-4"
                  >
                    Clear Filter
                  </Link>
                )}
              </div>
            </div>
            
            {/* Recent posts */}
            <div className="bg-darkBg/30 dark:bg-darkBg/30 rounded-lg p-6 border border-textSecondary/10">
              <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map(post => (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="block group">
                    <h4 className="font-medium group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-sm text-textSecondary">{post.date}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <ScrollRevealSection className="py-16">
        <div className="max-w-3xl mx-auto">
          <NewsletterSignup 
            title="Stay Updated" 
            description="Subscribe to get our latest articles, tools, and resources delivered to your inbox."
          />
        </div>
      </ScrollRevealSection>
    </div>
  )
} 