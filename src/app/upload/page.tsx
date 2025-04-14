import ImageUploader from '@/components/ImageUploader';

export const metadata = {
  title: 'Upload Images - Modecollapse',
  description: 'Upload images to use in your projects',
};

export default function UploadPage() {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-heading mb-2 text-primary">
          Image Uploader
        </h1>
        
        <p className="text-textSecondary dark:text-textSecondary text-lg max-w-3xl mb-10">
          Upload images to Vercel Blob Storage for use in your projects
        </p>
        
        <div className="bg-darkBg/30 dark:bg-darkBg/30 border border-textSecondary/10 rounded-lg p-6 md:p-8">
          <ImageUploader />
        </div>
        
        <div className="mt-8 text-textSecondary text-sm">
          <h3 className="text-lg font-medium text-textPrimary mb-2">About Vercel Blob Storage</h3>
          <p className="mb-2">
            Vercel Blob is a storage solution for files, images, and other media. It provides:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Global distribution for fast loading</li>
            <li>Storage for images, videos, and other assets</li>
            <li>Automatic optimization for web images</li>
            <li>Integration with Next.js Image component</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 