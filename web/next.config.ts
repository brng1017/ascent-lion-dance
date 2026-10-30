import type { NextConfig } from 'next';
import { sanity } from 'next-sanity/live/cache-life';

const nextConfig: NextConfig = {
  // Bake this public flag into the build so preview functions also stay noindex
  // when the hosting provider does not expose its build context at runtime.
  env: {
    SITE_ALLOW_INDEXING: String(
      !process.env.CONTEXT || process.env.CONTEXT === 'production',
    ),
  },
  cacheComponents: true,
  cacheLife: { default: sanity },
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/e2taaqx6/**',
      },
    ],
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
