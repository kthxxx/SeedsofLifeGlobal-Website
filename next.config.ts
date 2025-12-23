/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the turbopack root warning
  turbopack: {
    root: __dirname,
  },
  // Enable strict mode for better development experience
  reactStrictMode: true,
  // Optimize images
  images: {
    domains: ['seedsoflifeglobal.org', 'www.seedsoflifeglobal.org'],
    formats: ['image/avif', 'image/webp'],
  },
  // Production optimizations
  swcMinify: true,
  // Ensure trailing slashes are consistent
  trailingSlash: false,
}

module.exports = nextConfig