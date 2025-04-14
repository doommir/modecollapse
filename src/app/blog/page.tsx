'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import SectionDivider from '@/components/SectionDivider'

// Mock data for blog posts - in a real app, you would fetch this from an API or CMS
const POSTS_PER_PAGE = 5
const blogPosts = [
  {
    id: '0',
    slug: 'youre-not-broken-the-system-is-optimized-for-collapse',
    title: 'You\'re Not Broken — The System Is Optimized for Collapse',
    excerpt: 'Welcome to Mode Collapse: A Digital Lab for Upgrading Consciousness',
    date: '2024-05-22',
    author: 'Matt',
    category: 'Education',
    thumbnail: '/blog/mode-collapse.jpg',
  },
  {
    id: '1',
    slug: 'getting-started-with-ai-tools',
    title: 'Getting Started with AI Tools',
    excerpt: 'A beginner-friendly guide to integrating AI tools into your workflow.',
    date: '2023-10-15',
    author: 'Jane Doe',
    category: 'AI',
    thumbnail: '/blog/ai-tools.jpg',
  },
  {
    id: '2',
    slug: 'the-future-of-web-development',
    title: 'The Future of Web Development',
    excerpt: 'Exploring trends and technologies shaping the next generation of web applications.',
    date: '2023-09-28',
    author: 'John Smith',
    category: 'Web Development',
    thumbnail: '/blog/web-dev.jpg',
  },
  {
    id: '3',
    slug: 'maximizing-productivity-with-studycrafter',
    title: 'Maximizing Productivity with StudyCrafter',
    excerpt: 'Tips and tricks to get the most out of the StudyCrafter tool for effective learning.',
    date: '2023-09-10',
    author: 'Alex Johnson',
    category: 'Productivity',
    thumbnail: '/blog/productivity.jpg',
  },
  {
    id: '4',
    slug: 'design-principles-for-modern-applications',
    title: 'Design Principles for Modern Applications',
    excerpt: 'Core design principles that lead to better user experiences in contemporary applications.',
    date: '2023-08-22',
    author: 'Sarah Williams',
    category: 'Design',
    thumbnail: '/blog/design.jpg',
  },
  {
    id: '5',
    slug: 'building-with-nextjs',
    title: 'Building with Next.js',
    excerpt: 'A comprehensive overview of building applications with the Next.js framework.',
    date: '2023-08-12',
    author: 'Michael Brown',
    category: 'Development',
    thumbnail: '/blog/nextjs.jpg',
  },
  {
    id: '6',
    slug: 'ai-and-creativity',
    title: 'AI and Creativity',
    excerpt: 'How artificial intelligence is enhancing creative processes rather than replacing them.',
    date: '2023-07-29',
    author: 'Emma Wilson',
    category: 'AI',
    thumbnail: '/blog/ai-creativity.jpg',
  },
]

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)))
  
  // Filter posts by category if selected
  const filteredPosts = selectedCategory 
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)
  
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollRevealSection className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading mb-6 text-primary">
              Blog
            </h1>
            <p className="text-textSecondary text-lg max-w-3xl mb-8">
              Thoughts, ideas, and insights on technology, AI, and development.
            </p>
          </motion.div>
        </ScrollRevealSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with category filters */}
          <div className="lg:col-span-1">
            <div className="bg-darkBg/30 rounded-lg border border-textSecondary/10 overflow-hidden">
              <div className="p-4 border-b border-textSecondary/10">
                <h2 className="font-bold text-textPrimary">Categories</h2>
              </div>
              
              <nav className="p-2">
                <button 
                  onClick={() => {
                    setSelectedCategory(null)
                    setCurrentPage(1)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md mb-1 ${!selectedCategory ? 'bg-primary/20 text-primary' : 'text-textSecondary hover:bg-darkBg/50'}`}
                >
                  All Categories
                </button>
                
                {categories.map(category => (
                  <button 
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category)
                      setCurrentPage(1)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md mb-1 ${selectedCategory === category ? 'bg-primary/20 text-primary' : 'text-textSecondary hover:bg-darkBg/50'}`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Main content area - blog posts list */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {currentPosts.length === 0 ? (
                <div className="bg-darkBg/30 rounded-lg p-6 text-center text-textSecondary">
                  No blog posts found. Please check back later.
                </div>
              ) : (
                currentPosts.map(post => (
                  <Link href={`/blog/${post.slug}`} key={post.id}>
                    <motion.div 
                      className="group bg-darkBg/30 rounded-lg overflow-hidden border border-textSecondary/10 hover:border-primary/30 transition-colors"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 h-full">
                        <div className="md:col-span-1 bg-darkBg/50 h-full relative overflow-hidden">
                          {post.id === '0' ? (
                            <img 
                              src="/blog/mode-collapse.png" 
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
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm text-primary bg-primary/10 px-2 py-1 rounded-md">
                              {post.category}
                            </span>
                            <span className="text-sm text-textSecondary">
                              {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
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
                    </motion.div>
                  </Link>
                ))
              )}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-md bg-darkBg/40 text-textSecondary disabled:opacity-50"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-md flex items-center justify-center ${
                          currentPage === page 
                            ? 'bg-primary text-darkBg' 
                            : 'bg-darkBg/40 text-textSecondary hover:bg-darkBg/60'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded-md bg-darkBg/40 text-textSecondary disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <SectionDivider />
        
        <ScrollRevealSection className="my-12">
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
            <h2 className="text-2xl font-bold text-primary mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-textSecondary mb-6">
              Stay up to date with our latest blog posts, tools, and resources.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow bg-darkBg/40 border border-textSecondary/20 rounded-md px-4 py-2 text-textPrimary focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
              <button
                type="button"
                className="px-6 py-2 bg-primary text-darkBg rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </ScrollRevealSection>
      </div>
    </div>
  )
} 