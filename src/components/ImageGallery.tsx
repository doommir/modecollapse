'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Image {
  url: string;
  filename: string;
}

interface ImageGalleryProps {
  images?: Image[];
  onSelect?: (image: Image) => void;
  selectable?: boolean;
}

export default function ImageGallery({ 
  images: initialImages, 
  onSelect, 
  selectable = false 
}: ImageGalleryProps) {
  const [images, setImages] = useState<Image[]>(initialImages || []);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isLoading, setIsLoading] = useState(!initialImages);
  
  // If no images are provided, we could fetch them from an API
  useEffect(() => {
    if (!initialImages) {
      // This would be replaced with your actual API endpoint
      // fetchImages().then(setImages).finally(() => setIsLoading(false));
      
      // For demo, just set loading to false
      setIsLoading(false);
    }
  }, [initialImages]);
  
  const handleImageSelect = (image: Image) => {
    if (!selectable) return;
    
    setSelectedImage(image);
    if (onSelect) {
      onSelect(image);
    }
  };
  
  if (isLoading) {
    return (
      <div className="w-full p-10 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
        <p className="mt-2 text-textSecondary">Loading images...</p>
      </div>
    );
  }
  
  if (images.length === 0) {
    return (
      <div className="w-full p-10 text-center bg-darkBg/20 rounded-lg border border-textSecondary/10">
        <p className="text-textSecondary">No images found</p>
        <p className="text-sm text-textSecondary mt-1">
          Upload some images to see them here
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div 
          key={image.url || index}
          className={`
            relative aspect-square rounded-lg overflow-hidden border-2 transition-all
            ${selectable ? 'cursor-pointer hover:scale-[1.02]' : ''}
            ${selectedImage?.url === image.url 
              ? 'border-primary shadow-md shadow-primary/20' 
              : 'border-transparent hover:border-textSecondary/20'}
          `}
          onClick={() => handleImageSelect(image)}
        >
          <Image
            src={image.url}
            alt={image.filename || `Image ${index + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform hover:scale-105"
          />
          {selectable && selectedImage?.url === image.url && (
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
              <div className="bg-primary text-darkBg rounded-full p-1">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 