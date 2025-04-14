'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { BlogPost, blogPosts } from '@/data/blogPosts'

export default function EditBlogPost() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [post, setPost] = useState<BlogPost | null>(null)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  
  useEffect(() => {
    // Find the blog post with the matching slug
    const foundPost = blogPosts.find(p => p.slug === slug)
    if (foundPost) {
      setPost(foundPost)
      setContent(foundPost.content)
      setTitle(foundPost.title)
      setExcerpt(foundPost.excerpt)
    }
  }, [slug])
  
  const handleSave = async () => {
    if (!post) return
    
    setIsSaving(true)
    setSaveMessage('')
    
    try {
      // In a real app, this would be an API call to update the post
      // For demo purposes, we'll just show a success message
      // In a production system, you'd update a database or CMS
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update the post in the array (this is temporary and won't persist after page reload)
      const updatedPost = { ...post, content, title, excerpt }
      const index = blogPosts.findIndex(p => p.id === post.id)
      if (index >= 0) {
        blogPosts[index] = updatedPost
      }
      
      setSaveMessage('Changes saved! Note: In this demo, changes will be lost on page reload.')
    } catch (error) {
      setSaveMessage('Error saving changes. Please try again.')
      console.error('Error saving blog post:', error)
    } finally {
      setIsSaving(false)
    }
  }
  
  if (!post) {
    return (
      <div className="min-h-screen bg-darkBg text-textPrimary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Link href="/admin" className="text-primary hover:underline">
            Return to Admin Dashboard
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-darkBg text-textPrimary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Edit Blog Post</h1>
          <div className="space-x-4">
            <Link 
              href={`/blog/${post.slug}`} 
              className="px-4 py-2 bg-darkBg/50 hover:bg-darkBg/70 text-textPrimary rounded-md transition-colors"
              target="_blank"
            >
              View Post
            </Link>
            <Link 
              href="/admin" 
              className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-md transition-colors"
            >
              Back to Admin
            </Link>
          </div>
        </div>
        
        <div className="bg-darkBg/30 border border-textSecondary/10 rounded-lg p-6 mb-8">
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-darkBg/50 border border-textSecondary/20 rounded-md px-4 py-2 text-textPrimary"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
              Excerpt
            </label>
            <input
              type="text"
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full bg-darkBg/50 border border-textSecondary/20 rounded-md px-4 py-2 text-textPrimary"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content (HTML)
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
              className="w-full bg-darkBg/50 border border-textSecondary/20 rounded-md px-4 py-2 text-textPrimary font-mono text-sm"
            ></textarea>
            <p className="text-xs text-textSecondary mt-2">
              HTML formatting is supported. Use paragraph tags &lt;p&gt;, headers &lt;h2&gt;, lists &lt;ul&gt;&lt;li&gt;, etc.
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-4 py-2 bg-primary text-white rounded-md transition-colors ${
                isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/80'
              }`}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            
            {saveMessage && (
              <p className={`text-sm ${saveMessage.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                {saveMessage}
              </p>
            )}
          </div>
        </div>
        
        <div className="bg-darkBg/30 border border-textSecondary/10 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="border border-textSecondary/10 rounded-lg p-6 bg-darkBg/50">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-textSecondary mb-4">{excerpt}</p>
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 