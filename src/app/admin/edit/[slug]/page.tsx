'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { BlogPost, blogPosts } from '@/data/blogPosts'
import { marked } from 'marked'

export default function EditBlogPost() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [post, setPost] = useState<BlogPost | null>(null)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [saveMessage, setSaveMessage] = useState('')
  const [saveError, setSaveError] = useState('')
  const [isNewPost, setIsNewPost] = useState(false)
  const [htmlPreview, setHtmlPreview] = useState('')
  const [editorMode, setEditorMode] = useState<'edit' | 'split' | 'preview'>('edit')
  
  // Categories for the dropdown
  const categories = ['Education', 'AI', 'Web Development', 'Productivity', 'Content Creation', 'Uncategorized'];
  
  // Convert Markdown to HTML for preview
  useEffect(() => {
    try {
      // Configure marked to preserve whitespace
      marked.setOptions({
        breaks: true,
        gfm: true
      });
      
      // Cast the result to string to fix type issues
      const html = marked(content) as string;
      setHtmlPreview(html);
    } catch (error) {
      console.error('Error parsing markdown:', error);
      setHtmlPreview('<p>Error previewing markdown</p>');
    }
  }, [content]);
  
  useEffect(() => {
    fetchBlogPost();
  }, [slug]);
  
  const fetchBlogPost = async () => {
    setIsLoading(true);
    
    // Check if this is a new post (slug starts with "new-post-")
    const isNew = slug.startsWith('new-post-');
    setIsNewPost(isNew);
    
    if (isNew) {
      // For new posts, set default values with markdown
      const defaultPost: BlogPost = {
        id: '', // Will be assigned by the API
        slug: slug,
        title: 'New Blog Post',
        excerpt: 'A brief description of your new post',
        date: new Date().toISOString().split('T')[0],
        author: 'Admin',
        category: 'Uncategorized',
        thumbnail: '/blog/placeholder.jpg',
        content: `# Getting Started

This is a new blog post. You can use Markdown to format your content.

## What is Markdown?

Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

- **Bold text** is created with \`**bold**\`
- *Italic text* is created with \`*italic*\`
- [Links](https://modecollapse.io) are created with \`[text](url)\`

### Add more sections

Start writing your content here...`,
        relatedPosts: []
      };
      
      setPost(defaultPost);
      setContent(defaultPost.content);
      setTitle(defaultPost.title);
      setExcerpt(defaultPost.excerpt);
      setAuthor(defaultPost.author);
      setCategory(defaultPost.category);
      setIsLoading(false);
      return;
    }
    
    try {
      // First try to fetch from the API
      const response = await fetch(`/api/blog?slug=${slug}`);
      
      if (response.ok) {
        const data = await response.json();
        const fetchedPost = data.post;
        
        setPost(fetchedPost);
        setContent(fetchedPost.content);
        setTitle(fetchedPost.title);
        setExcerpt(fetchedPost.excerpt);
        setAuthor(fetchedPost.author);
        setCategory(fetchedPost.category);
      } else {
        // If API fails, fall back to the imported data
        const foundPost = blogPosts.find(p => p.slug === slug);
        if (foundPost) {
          setPost(foundPost);
          setContent(foundPost.content);
          setTitle(foundPost.title);
          setExcerpt(foundPost.excerpt);
          setAuthor(foundPost.author);
          setCategory(foundPost.category);
        }
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      
      // Fall back to the imported data as a last resort
      const foundPost = blogPosts.find(p => p.slug === slug);
      if (foundPost) {
        setPost(foundPost);
        setContent(foundPost.content);
        setTitle(foundPost.title);
        setExcerpt(foundPost.excerpt);
        setAuthor(foundPost.author);
        setCategory(foundPost.category);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    // Clear the admin session cookie
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // Redirect to login page
    router.push('/admin/login');
  };
  
  const handleSave = async () => {
    if (!post) return;
    
    setIsSaving(true);
    setSaveMessage('');
    setSaveError('');
    
    try {
      // Prepare the updated post object
      const updatedPost = {
        ...post,
        title,
        excerpt,
        content,
        author,
        category
      };
      
      // For new posts, generate a proper slug from the title
      if (isNewPost) {
        // Generate a slug from the title
        const generatedSlug = title.toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove special chars
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Remove duplicate hyphens
          .trim();
        
        updatedPost.slug = generatedSlug;
      }
      
      // Send the update request to the API - use POST for new posts, PUT for existing ones
      const method = isNewPost ? 'POST' : 'PUT';
      const response = await fetch('/api/blog', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: updatedPost }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save changes');
      }
      
      const data = await response.json();
      
      // Update the local state with the returned post
      setPost(data.post || updatedPost);
      
      setSaveMessage('Changes saved successfully!');
      
      // If this was a new post and we got a proper slug back, redirect to the edit page with the real slug
      if (isNewPost && data.post && data.post.slug !== slug) {
        router.push(`/admin/edit/${data.post.slug}`);
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      setSaveError(error instanceof Error ? error.message : 'Error saving changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-darkBg text-textPrimary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading blog post...</h1>
        </div>
      </div>
    );
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
          <h1 className="text-3xl font-bold">{isNewPost ? 'Create New Post' : 'Edit Blog Post'}</h1>
          <div className="flex space-x-4">
            {!isNewPost && (
              <Link 
                href={`/blog/${post.slug}`} 
                className="px-4 py-2 bg-darkBg/50 hover:bg-darkBg/70 text-textPrimary rounded-md transition-colors"
                target="_blank"
              >
                View Post
              </Link>
            )}
            <Link 
              href="/admin" 
              className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-md transition-colors"
            >
              Back to Admin
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="bg-darkBg/30 border border-textSecondary/10 rounded-lg p-6 mb-8">
          {saveError && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-400/10 rounded-lg text-red-400">
              {saveError}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              <label htmlFor="author" className="block text-sm font-medium mb-2">
                Author
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-darkBg/50 border border-textSecondary/20 rounded-md px-4 py-2 text-textPrimary"
              />
            </div>
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
            <label htmlFor="category" className="block text-sm font-medium mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-darkBg/50 border border-textSecondary/20 rounded-md px-4 py-2 text-textPrimary"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="content" className="block text-sm font-medium">
                Content (Markdown)
              </label>
              <div className="flex border border-textSecondary/20 rounded-md overflow-hidden">
                <button
                  onClick={() => setEditorMode('edit')}
                  className={`px-3 py-1 text-xs ${
                    editorMode === 'edit' 
                      ? 'bg-primary text-white' 
                      : 'bg-darkBg/50 text-textSecondary hover:bg-darkBg/70'
                  }`}
                >
                  Edit Mode
                </button>
                <button
                  onClick={() => setEditorMode('split')}
                  className={`px-3 py-1 text-xs ${
                    editorMode === 'split' 
                      ? 'bg-primary text-white' 
                      : 'bg-darkBg/50 text-textSecondary hover:bg-darkBg/70'
                  }`}
                >
                  Split Mode
                </button>
                <button
                  onClick={() => setEditorMode('preview')}
                  className={`px-3 py-1 text-xs ${
                    editorMode === 'preview' 
                      ? 'bg-primary text-white' 
                      : 'bg-darkBg/50 text-textSecondary hover:bg-darkBg/70'
                  }`}
                >
                  Preview Mode
                </button>
              </div>
            </div>
            
            <div className={`w-full ${editorMode === 'split' ? 'grid grid-cols-2 gap-4' : ''}`}>
              {/* Editor */}
              {(editorMode === 'edit' || editorMode === 'split') && (
                <div className={`${editorMode === 'split' ? '' : 'mb-4'}`}>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={20}
                    className="w-full h-full bg-darkBg/50 border border-textSecondary/20 rounded-md px-4 py-2 text-textPrimary font-mono text-sm"
                    placeholder="Write your markdown content here..."
                  ></textarea>
                </div>
              )}
              
              {/* Preview */}
              {(editorMode === 'preview' || editorMode === 'split') && (
                <div className={`border border-textSecondary/20 rounded-md bg-darkBg/50 p-4 prose prose-invert max-w-none h-full overflow-y-auto whitespace-pre-wrap`}>
                  <div dangerouslySetInnerHTML={{ __html: htmlPreview }} className="markdown-preview" />
                </div>
              )}
            </div>
            
            <div className="text-xs text-textSecondary mt-2 p-3 bg-darkBg/50 border border-textSecondary/10 rounded-md">
              <p className="font-medium text-sm mb-1">Markdown formatting:</p>
              <ul className="grid grid-cols-2 gap-2">
                <li># Heading 1</li>
                <li>## Heading 2</li>
                <li>**Bold text**</li>
                <li>*Italic text*</li>
                <li>[Link](https://example.com)</li>
                <li>![Image Alt](image-url.jpg)</li>
                <li>- Bullet list item</li>
                <li>1. Numbered list item</li>
                <li>{`>`} Blockquote</li>
                <li>{`\`\`\``}code block{`\`\`\``}</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-4 py-2 bg-primary text-white rounded-md transition-colors ${
                isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/80'
              }`}
            >
              {isSaving ? 'Saving...' : isNewPost ? 'Create Post' : 'Save Changes'}
            </button>
            
            {saveMessage && (
              <p className="text-sm text-green-400">
                {saveMessage}
              </p>
            )}
          </div>
        </div>
        
        <div className="bg-darkBg/30 border border-textSecondary/10 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="border border-textSecondary/10 rounded-lg p-6 bg-darkBg/50">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <div className="flex items-center space-x-4 text-sm text-textSecondary mb-4">
              <span>By {author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                {category}
              </span>
            </div>
            <p className="text-textSecondary mb-4">{excerpt}</p>
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlPreview }}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 