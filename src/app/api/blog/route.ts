import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BlogPost, blogPosts } from '@/data/blogPosts';

// Path to store blog posts data
const BLOG_POSTS_FILE_PATH = path.join(process.cwd(), 'data', 'blog-posts.json');

// Ensure the data directory exists
const ensureDirectoryExists = (filePath: string) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
};

// Load existing blog posts (if file exists, otherwise use in-memory data)
const loadBlogPosts = (): BlogPost[] => {
  try {
    if (!fs.existsSync(BLOG_POSTS_FILE_PATH)) {
      // If file doesn't exist, create it with initial data
      saveBlogPosts(blogPosts);
      return blogPosts;
    }
    const data = fs.readFileSync(BLOG_POSTS_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return blogPosts; // Fallback to in-memory data
  }
};

// Save blog posts to file
const saveBlogPosts = (posts: BlogPost[]) => {
  try {
    ensureDirectoryExists(BLOG_POSTS_FILE_PATH);
    fs.writeFileSync(BLOG_POSTS_FILE_PATH, JSON.stringify(posts, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving blog posts:', error);
    return false;
  }
};

// GET handler - Retrieve all blog posts or a single post
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    const posts = loadBlogPosts();
    
    if (slug) {
      // Return a specific post
      const post = posts.find(p => p.slug === slug);
      if (!post) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
      }
      return NextResponse.json({ post });
    }
    
    // Return all posts
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error retrieving blog posts:', error);
    return NextResponse.json({ error: 'Failed to retrieve blog posts' }, { status: 500 });
  }
}

// PUT handler - Update a blog post
export async function PUT(request: Request) {
  try {
    // Check for admin session (basic authentication)
    const cookies = request.headers.get('cookie');
    if (!cookies || !cookies.includes('admin_session=true')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { post } = body;
    
    if (!post || !post.id || !post.slug) {
      return NextResponse.json({ error: 'Invalid blog post data' }, { status: 400 });
    }
    
    // Load existing posts
    const posts = loadBlogPosts();
    
    // Find the post index
    const postIndex = posts.findIndex(p => p.id === post.id);
    
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }
    
    // Update the post
    posts[postIndex] = {
      ...posts[postIndex],
      ...post,
      // Preserve the id and slug (these shouldn't change)
      id: posts[postIndex].id,
      slug: posts[postIndex].slug,
    };
    
    // Save the updated posts
    const saved = saveBlogPosts(posts);
    
    if (!saved) {
      return NextResponse.json({ error: 'Failed to save blog post' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      message: 'Blog post updated successfully',
      post: posts[postIndex]
    });
  } catch (error) {
    console.error('Blog post update error:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

// POST handler - Create a new blog post
export async function POST(request: Request) {
  try {
    // Check for admin session (basic authentication)
    const cookies = request.headers.get('cookie');
    if (!cookies || !cookies.includes('admin_session=true')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { post } = body;
    
    if (!post || !post.title || !post.content) {
      return NextResponse.json({ error: 'Invalid blog post data' }, { status: 400 });
    }
    
    // Load existing posts
    const posts = loadBlogPosts();
    
    // Generate a new ID and slug if not provided
    const newPost: BlogPost = {
      id: post.id || String(posts.length),
      slug: post.slug || post.title.toLowerCase().replace(/[^\w]+/g, '-'),
      title: post.title,
      excerpt: post.excerpt || post.title,
      date: post.date || new Date().toISOString().split('T')[0],
      author: post.author || 'Admin',
      category: post.category || 'Uncategorized',
      thumbnail: post.thumbnail || '/blog/placeholder.jpg',
      content: post.content,
      relatedPosts: post.relatedPosts || [],
    };
    
    // Add the new post
    posts.push(newPost);
    
    // Save the updated posts
    const saved = saveBlogPosts(posts);
    
    if (!saved) {
      return NextResponse.json({ error: 'Failed to save blog post' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      message: 'Blog post created successfully',
      post: newPost
    }, { status: 201 });
  } catch (error) {
    console.error('Blog post creation error:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

// DELETE handler - Delete a blog post
export async function DELETE(request: Request) {
  try {
    // Check for admin session (basic authentication)
    const cookies = request.headers.get('cookie');
    if (!cookies || !cookies.includes('admin_session=true')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { id } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    // Load existing posts
    const posts = loadBlogPosts();
    
    // Check if post exists
    const postIndex = posts.findIndex(p => p.id === id);
    
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }
    
    // Remove the post
    posts.splice(postIndex, 1);
    
    // Save the updated posts
    const saved = saveBlogPosts(posts);
    
    if (!saved) {
      return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
    }
    
    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Blog post deletion error:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
} 