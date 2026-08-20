import type { NextConfig } from "next";

import { withSentryConfig } from "@sentry/nextjs";

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

export default withSentryConfig(nextConfig, {
  org: "sevlex",
  project: "laundrymall",
  silent: !process.env.CI,
});
