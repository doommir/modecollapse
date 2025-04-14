import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Only allow images
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Generate a unique filename
    const uniqueFilename = `${Date.now()}-${file.name}`;
    
    // Upload to Vercel Blob
    const { url, pathname } = await put(uniqueFilename, file, {
      access: 'public',
    });

    // Return the URL and other details
    return NextResponse.json({
      success: true,
      url,
      pathname,
      filename: file.name,
      size: file.size,
      type: file.type
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

// Set a 50MB limit for the request body
export const config = {
  api: {
    bodyParser: false,
  },
}; 