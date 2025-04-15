'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Import the blog posts - in a real app this would be fetched from an API
import { blogPosts } from '@/data/blogPosts'

export default function AdminPage() {
  const router = useRouter()
  const [posts, setPosts] = useState(blogPosts)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchBlogPosts()
  }, [])
  
  const fetchBlogPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/blog')
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts || blogPosts)
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleLogout = () => {
    // Clear the admin session cookie
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // Redirect to login page
    router.push('/admin/login');
  };
  
  const handleCreateNewPost = () => {
    // Generate a temporary unique ID and slug for the new post
    const newPostId = String(posts.length + 1);
    const newPostSlug = `new-post-${Date.now()}`;
    
    // Create a new post with default values
    const newPost = {
      id: newPostId,
      slug: newPostSlug,
      title: 'New Blog Post',
      excerpt: 'A brief description of your new post',
      date: new Date().toISOString().split('T')[0],
      author: 'Admin',
      category: 'Uncategorized',
      thumbnail: '/blog/placeholder.jpg',
      content: '<p>Start writing your blog post here...</p>',
      relatedPosts: []
    };
    
    // Add the new post to the array (temporary)
    setPosts([...posts, newPost]);
    
    // Navigate to the edit page for the new post
    router.push(`/admin/edit/${newPostSlug}`);
  };
  
  return (
    <div className="min-h-screen bg-darkBg text-textPrimary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Admin</h1>
          <div className="flex space-x-4">
            <Link href="/" className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-md transition-colors">
              Back to Home
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-darkBg/30 border border-textSecondary/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
            <p className="text-textSecondary mb-4">
              Manage your blog posts, edit content, and publish new articles.
            </p>
            <button 
              onClick={handleCreateNewPost}
              className="px-4 py-2 bg-primary text-white rounded-md inline-flex items-center hover:bg-primary/90 transition-colors"
            >
              Create New Post
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          <div className="bg-darkBg/30 border border-textSecondary/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Newsletter Subscribers</h2>
            <p className="text-textSecondary mb-4">
              View and manage your newsletter subscribers list.
            </p>
            <Link 
              href="/admin/subscribers" 
              className="px-4 py-2 bg-primary text-white rounded-md inline-flex items-center hover:bg-primary/90 transition-colors"
            >
              Manage Subscribers
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="bg-darkBg/30 border border-textSecondary/10 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Blog Posts</h2>
            <div className="flex items-center">
              {loading ? (
                <span className="text-textSecondary text-sm">Loading...</span>
              ) : (
                <span className="text-textSecondary text-sm">{posts.length} posts</span>
              )}
              <button
                onClick={fetchBlogPosts}
                className="ml-2 p-1 hover:bg-darkBg/50 rounded-full" 
                title="Refresh posts"
              >
                <svg className="w-5 h-5 text-textSecondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-textSecondary/10">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Author</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} className="border-b border-textSecondary/10 hover:bg-darkBg/50">
                    <td className="px-4 py-3">{post.id}</td>
                    <td className="px-4 py-3">{post.title}</td>
                    <td className="px-4 py-3">{post.author}</td>
                    <td className="px-4 py-3">{post.date}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Link 
                          href={`/admin/edit/${post.slug}`}
                          className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-sm transition-colors"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="px-3 py-1.5 bg-darkBg/50 hover:bg-darkBg/70 text-textPrimary rounded-md text-sm transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 