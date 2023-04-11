/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.jsdelivr.net']
  },
  staticPageGenerationTimeout: 120,
}

module.exports = nextConfig