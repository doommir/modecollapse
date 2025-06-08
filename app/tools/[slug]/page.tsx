'use client';

import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools';
import ToolDetail from '@/components/ToolDetail';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ToolPage({ params }: PageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
              <span className="text-3xl">🌀</span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Tool not found
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            You may still be dreaming inside the algorithm…
          </p>
          <a 
            href="/tools" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-200"
          >
            ← Browse Tools
          </a>
        </div>
      </div>
    );
  }

  return <ToolDetail tool={tool} />;
}

// Temporarily disabled static generation to resolve build issues
// export async function generateStaticParams() {
//   const tools = await import('@/lib/tools').then(module => module.getAllTools());
//   return tools.map((tool) => ({
//     slug: tool.slug,
//   }));
// }