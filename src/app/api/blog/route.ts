import { NextResponse } from 'next/server';
import { blogPosts } from '@/data/blogPosts';
import { connectToDatabase, convertDocToObj } from '@/lib/mongodb';
import BlogPostModel from '@/models/BlogPost';

// Initialize the database by seeding blog posts if not already present
const initializeDatabase = async () => {
  try {
    await connectToDatabase();
    
    // Check if we already have blog posts in the database
    const count = await BlogPostModel.countDocuments();
    
    if (count === 0) {
      console.log('Seeding database with initial blog posts...');
      // No blog posts found, let's seed the database with the static data
      await BlogPostModel.insertMany(blogPosts);
      console.log('Database seeded successfully');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// GET handler - Retrieve all blog posts or a single post
export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (slug) {
      // Return a specific post
      const post = await BlogPostModel.findOne({ slug });
      if (!post) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
      }
      return NextResponse.json({ post: convertDocToObj(post) });
    }
    
    // Return all posts
    const posts = await BlogPostModel.find({}).sort({ date: -1 });
    return NextResponse.json({ posts: posts.map(post => convertDocToObj(post)) });
  } catch (error) {
    console.error('Error retrieving blog posts:', error);
    return NextResponse.json({ error: 'Failed to retrieve blog posts' }, { status: 500 });
  }
}

// Call initialization during module load
initializeDatabase().catch(console.error);

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
    
    await connectToDatabase();
    
    // Find and update the post
    const updatedPost = await BlogPostModel.findOneAndUpdate(
      { id: post.id },
      post,
      { new: true } // Return the updated document
    );
    
    if (!updatedPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      message: 'Blog post updated successfully',
      post: convertDocToObj(updatedPost)
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
    
    await connectToDatabase();
    
    // Generate a new ID if not provided
    if (!post.id) {
      const count = await BlogPostModel.countDocuments();
      post.id = String(count);
    }
    
    // Generate a slug if not provided
    if (!post.slug) {
      post.slug = post.title.toLowerCase().replace(/[^\w]+/g, '-');
    }
    
    // Fill in other required fields with defaults if not provided
    const newPost = {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || post.title,
      date: post.date || new Date().toISOString().split('T')[0],
      author: post.author || 'Admin',
      category: post.category || 'Uncategorized',
      thumbnail: post.thumbnail || '/blog/placeholder.jpg',
      content: post.content,
      relatedPosts: post.relatedPosts || [],
    };
    
    // Create the new blog post
    const createdPost = await BlogPostModel.create(newPost);
    
    return NextResponse.json({ 
      message: 'Blog post created successfully',
      post: convertDocToObj(createdPost)
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
    
    await connectToDatabase();
    
    // Find and delete the post
    const deletedPost = await BlogPostModel.findOneAndDelete({ id });
    
    if (!deletedPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Blog post deletion error:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
} 