'use client';

import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';

interface UploadedImage {
  url: string;
  filename: string;
  size: number;
  type: string;
}

export default function ImageUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  
  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndUpload(e.target.files[0]);
    }
  };
  
  // Validate and upload the file
  const validateAndUpload = async (file: File) => {
    // Reset states
    setError(null);
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be less than 10MB');
      return;
    }
    
    await uploadFile(file);
  };
  
  // Upload the file to Vercel Blob
  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Create a FormData object
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);
      
      // Upload the file
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload image');
      }
      
      setUploadProgress(100);
      
      // Get the uploaded image URL
      const data = await response.json();
      setUploadedImage({
        url: data.url,
        filename: data.filename,
        size: data.size,
        type: data.type
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };
  
  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (fileInputRef.current?.files?.length) {
      validateAndUpload(fileInputRef.current.files[0]);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        onDragEnter={handleDrag}
        className="mb-6"
      >
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/10' 
              : 'border-textSecondary/30 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            id="file-upload"
            disabled={isUploading}
          />
          
          <label 
            htmlFor="file-upload" 
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-textSecondary mb-3" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
            
            <p className="text-textSecondary">
              <span className="text-primary font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-textSecondary mt-1">
              PNG, JPG, GIF up to 10MB
            </p>
          </label>
        </div>
        
        {/* Upload progress */}
        {isUploading && (
          <div className="mt-4">
            <p className="text-sm text-textSecondary mb-1">
              Uploading... {uploadProgress}%
            </p>
            <div className="w-full bg-darkBg/30 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all" 
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="mt-4 text-red-500 text-sm">
            {error}
          </div>
        )}
      </form>
      
      {/* Uploaded image preview */}
      {uploadedImage && (
        <div className="mt-6 bg-darkBg/30 p-4 rounded-lg border border-textSecondary/10">
          <h3 className="text-lg font-medium text-textPrimary mb-2">Uploaded Image</h3>
          
          <div className="relative w-full h-48 bg-darkBg/50 rounded-md overflow-hidden mb-3">
            <Image
              src={uploadedImage.url}
              alt={uploadedImage.filename}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-contain"
              priority
            />
          </div>
          
          <div className="flex flex-col gap-1 text-sm">
            <p className="text-textSecondary">
              <span className="text-textPrimary font-medium">Filename:</span> {uploadedImage.filename}
            </p>
            <p className="text-textSecondary">
              <span className="text-textPrimary font-medium">Size:</span> {Math.round(uploadedImage.size / 1024)} KB
            </p>
            <p className="text-textSecondary">
              <span className="text-textPrimary font-medium">URL:</span>
              <input
                type="text"
                value={uploadedImage.url}
                readOnly
                className="ml-2 p-1 text-xs bg-darkBg/50 rounded border border-textSecondary/20 w-full mt-1"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
            </p>
          </div>
          
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
              onClick={() => {
                navigator.clipboard.writeText(uploadedImage.url);
                alert('URL copied to clipboard!');
              }}
            >
              Copy URL
            </button>
            
            <button
              type="button"
              className="px-4 py-2 bg-darkBg/50 text-textSecondary rounded-md hover:bg-darkBg/70 transition-colors"
              onClick={() => {
                setUploadedImage(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
            >
              Upload Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 