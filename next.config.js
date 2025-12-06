/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Allows importing images from the public folder directly
  images: {
    unoptimized: true, // Since we are using static image paths
  },
  // Configuração para ignorar erros de tipagem e linting no build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // appDir: true, // Removed as it's deprecated or causing warnings in this context
  },
};

module.exports = nextConfig;