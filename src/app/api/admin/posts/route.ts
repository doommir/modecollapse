import { NextResponse } from 'next/server';
import { getAllPostsMeta } from '@/lib/blog'; // Import the server-side function

export async function GET(request: Request) {
  try {
    // Check for admin session (example - implement proper auth)
    // const cookies = request.headers.get('cookie');
    // if (!cookies || !cookies.includes('admin_session=true')) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const posts = await getAllPostsMeta(); // Fetch metadata on the server
    return NextResponse.json({ posts });

  } catch (error) {
    console.error('[API /admin/posts] Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to retrieve blog posts' }, { status: 500 });
  }
} 