import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['storage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/assistants.lablab.ai/**',
      },
    ],
  },
};

export default nextConfig;
