import type { NextConfig } from "next";
import createMDX from '@next/mdx';

// MDX Configuration
const withMDX = createMDX({
  // Add options here if needed
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'], // Add md/mdx extensions
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  images: {
    domains: ['storage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/assistants.lablab.ai/**',
      },
      {
        protocol: 'https',
        hostname: '*.vercel-blob.com',
        pathname: '/**',
      }
    ],
  },
};

// Wrap the config with MDX support
export default withMDX(nextConfig);
