'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ImageGallery from '@/components/ImageGallery';

interface Image {
  url: string;
  filename: string;
  size: number;
  uploadedAt: string;
}

export default function ImagesPage() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/images');
        
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        
        const data = await response.json();
        setImages(data.images || []);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to load images. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchImages();
  }, []);
  
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading mb-2 text-primary">
              Image Gallery
            </h1>
            <p className="text-textSecondary dark:text-textSecondary text-lg max-w-3xl">
              Browse images uploaded to Vercel Blob Storage
            </p>
          </div>
          
          <Link
            href="/upload"
            className="mt-4 md:mt-0 px-6 py-3 bg-primary text-darkBg rounded-md hover:bg-primary/90 transition-colors inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Upload New Image
          </Link>
        </div>
        
        {isLoading ? (
          <div className="w-full p-16 text-center">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-primary border-r-transparent" />
            <p className="mt-4 text-textSecondary">Loading images...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 text-red-500 p-6 rounded-lg">
            <p>{error}</p>
          </div>
        ) : (
          <div className="bg-darkBg/30 dark:bg-darkBg/30 border border-textSecondary/10 rounded-lg p-6 md:p-8">
            <ImageGallery images={images} />
          </div>
        )}
        
        {!isLoading && !error && images.length === 0 && (
          <div className="mt-8 text-center">
            <p className="text-textSecondary">No images found</p>
            <Link
              href="/upload"
              className="mt-4 inline-block px-6 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              Upload your first image
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 