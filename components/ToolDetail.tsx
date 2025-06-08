'use client';

import { Tool } from '@/lib/tools';
import { ExternalLink, Copy, Brain, Star } from 'lucide-react';

interface ToolDetailProps {
  tool: Tool;
}

export default function ToolDetail({ tool }: ToolDetailProps) {
  const consciousnessStars = Array.from({ length: 5 }, (_, i) => i < tool.consciousnessScore);

  const copyToClipboard = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  };

  const handleCopyClick = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    copyToClipboard(text);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <a 
            href="/tools" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6"
          >
            ← Back to Tools
          </a>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {tool.name}
              </h1>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                {tool.summary}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tool.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-end gap-4">
              {/* Consciousness Score */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-400">Consciousness</span>
                </div>
                <div className="flex gap-1">
                  {consciousnessStars.map((filled, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${filled ? 'text-cyan-400 fill-cyan-400' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 mt-1 block">
                  {tool.consciousnessScore}/5
                </span>
              </div>

              {/* Visit Tool Button */}
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
              >
                Visit Tool
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Curator Note */}
        <div className="mb-12 p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-purple-300">Curator's Note</h3>
          <p className="text-gray-300 italic">
            "{tool.curatorNote}"
          </p>
        </div>

        {/* Prompt Tips */}
        {tool.promptTips.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Prompt Tips</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {tool.promptTips.map((tip, index) => (
                <div 
                  key={index}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-3 text-cyan-300">
                    {tip.title}
                  </h3>
                  <div className="relative">
                    <code className="block text-sm text-gray-300 bg-black/50 p-4 rounded border border-gray-700 font-mono leading-relaxed">
                      {tip.snippet}
                    </code>
                    <button
                      onClick={(e) => handleCopyClick(e, tip.snippet)}
                      className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}