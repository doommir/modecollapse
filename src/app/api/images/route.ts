import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
  try {
    // List all blobs in the 'images' prefix
    const { blobs } = await list({
      prefix: '', // You can set a prefix to organize files, e.g., 'user-uploads/'
    });

    // Map to a simpler format
    const images = blobs.map(blob => ({
      url: blob.url,
      pathname: blob.pathname,
      filename: blob.pathname.split('/').pop() || 'unnamed',
      size: blob.size,
      uploadedAt: blob.uploadedAt
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error listing images:', error);
    return NextResponse.json(
      { error: 'Failed to list images' },
      { status: 500 }
    );
  }
} 