'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
// import { BlogPost, blogPosts } from '@/data/blogPosts' // Removed old data import
import { marked } from 'marked'

// Define BlogPost type locally if needed, or fetch structure from API
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  thumbnail: string;
  content: string;
  relatedPosts?: string[];
}

export default function EditBlogPost() {
  const params = useParams<{ slug?: string }>()
  const router = useRouter()

  // Derive slug safely (can be empty string on first render)
  const slug = typeof params?.slug === 'string' ? params.slug : ''
  
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
    if (!slug) {
      // No slug yet; stop loading indicator so UI can render
      setIsLoading(false)
      return
    }
    fetchBlogPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  
  const fetchBlogPost = async () => {
    setIsLoading(true);
    setSaveError(''); // Clear previous errors
    
    const isNew = slug.startsWith('new-post-');
    setIsNewPost(isNew);
    
    if (isNew) {
      // Default content for a new post
      const defaultContent = `# Getting Started\n\nThis is a new blog post. You can use Markdown to format your content.\n\n## What is Markdown?\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n- **Bold text** is created with \`**bold**\`\n- *Italic text* is created with \`*italic*\`\n- [Links](https://modecollapse.io) are created with \`[text](url)\`\n\n### Add more sections\n\nStart writing your content here...`;
      
      const defaultPost: BlogPost = {
        id: '', // Will be assigned by the API
        slug: slug,
        title: 'New Blog Post',
        excerpt: 'A brief description of your new post',
        date: new Date().toISOString().split('T')[0],
        author: 'Admin',
        category: 'Uncategorized',
        thumbnail: '/blog/placeholder.jpg',
        content: defaultContent,
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
    
    // Fetch existing post from API
    try {
      const response = await fetch(`/api/blog?slug=${slug}`);
      if (!response.ok) {
        const errorData = await response.text(); // Get text for better debugging
        throw new Error(`API error: ${response.status} ${response.statusText} - ${errorData}`);
      }
      
      const data = await response.json();
      if (!data || !data.post) {
        throw new Error('Invalid data received from API');
      }
      
      const fetchedPost = data.post as BlogPost; // Assuming API returns BlogPost structure
      setPost(fetchedPost);
      setContent(fetchedPost.content);
      setTitle(fetchedPost.title);
      setExcerpt(fetchedPost.excerpt);
      setAuthor(fetchedPost.author);
      setCategory(fetchedPost.category);
      
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setSaveError(`Failed to load blog post data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };
  
  const handleSave = async () => {
    if (!post && !isNewPost) return; // Don't save if no post loaded unless it's new
    
    setIsSaving(true);
    setSaveMessage('');
    setSaveError('');
    
    try {
      const postDataToSave = {
        ...(isNewPost ? {} : post), // Spread existing post only if editing
        id: post?.id || '', // Send ID if available
        slug: isNewPost 
          ? title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim() 
          : post?.slug, // Use generated slug for new, existing slug otherwise
        title,
        excerpt,
        content,
        author,
        category,
        date: post?.date || new Date().toISOString().split('T')[0], // Keep existing date or set new one
        thumbnail: post?.thumbnail || '/blog/placeholder.jpg', // Keep existing thumb or default
      };
      
      const method = isNewPost ? 'POST' : 'PUT';
      const response = await fetch('/api/blog', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post: postDataToSave }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save changes');
      }
      
      const data = await response.json();
      const savedPost = data.post as BlogPost;
      
      setPost(savedPost);
      setSaveMessage('Changes saved successfully!');
      
      if (isNewPost) {
        // Redirect to the new slug after successful creation
        router.push(`/admin/edit/${savedPost.slug}`);
        setIsNewPost(false); // No longer a new post
      }

    } catch (error) {
      console.error('Error saving blog post:', error);
      setSaveError(error instanceof Error ? error.message : 'Error saving changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // ----- JSX Rendering ----- 
  // (Keep the existing JSX structure, including loading/error states and the form)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-darkBg text-textPrimary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading blog post...</h1>
        </div>
      </div>
    );
  }
  
  // Display error if fetching failed and it's not a new post scenario
  if (saveError && !isLoading && !isNewPost && !post) {
     return (
      <div className="min-h-screen bg-darkBg text-textPrimary flex items-center justify-center">
        <div className="text-center p-6 bg-red-900/20 rounded-lg border border-red-500/30">
          <h1 className="text-2xl font-bold mb-4 text-red-400">Error Loading Post</h1>
          <p className="text-red-300 mb-4">{saveError}</p>
          <Link href="/admin" className="text-primary hover:underline">
            Return to Admin Dashboard
          </Link>
        </div>
      </div>
    )
  }
  
  // If it's not loading, not an error state, but still no post (and not a 'new' post), show not found
  if (!post && !isNewPost && !isLoading) {
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
  
  // Main Edit Form JSX (copied from original structure)
  return (
    <div className="min-h-screen bg-darkBg text-textPrimary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{isNewPost ? 'Create New Post' : 'Edit Blog Post'}</h1>
          <div className="flex space-x-4">
            {!isNewPost && post?.slug && (
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
          {/* Display save error specific to the save action */}
          {saveError && isSaving && (
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
          <h2 className="text-xl font-semibold mb-4">Live Preview (Read Only)</h2>
          <div className="border border-textSecondary/10 rounded-lg p-6 bg-darkBg/50">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <div className="flex items-center space-x-4 text-sm text-textSecondary mb-4">
              <span>By {author}</span>
              <span>•</span>
              <span>{post?.date}</span> {/* Use optional chaining for post */} 
              <span>•</span>
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                {category}
              </span>
            </div>
            <p className="text-textSecondary mb-4">{excerpt}</p>
            <div 
              className="prose prose-invert max-w-none markdown-preview"
              dangerouslySetInnerHTML={{ __html: htmlPreview }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 