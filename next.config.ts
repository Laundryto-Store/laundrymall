import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'backend-production-3a66.up.railway.app',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // For Medusa S3 storage
      },
    ],
  },
};

export default nextConfig;
