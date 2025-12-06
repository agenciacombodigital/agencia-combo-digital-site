/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Allows importing images from the public folder directly
  images: {
    unoptimized: true, // Since we are using static image paths
  },
  // Ensure Tailwind CSS is correctly configured
  experimental: {
    // appDir: true, // Removed as it's deprecated or causing warnings in this context
  },
};

module.exports = nextConfig;