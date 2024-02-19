/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ence-invoice.s3.amazonaws.com', 'localhost', '**.ence.in'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ence-invoice.s3.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: '**.ence.in'
      }
    ]
  },
  webpack: (config, options) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      handlebars: 'handlebars/dist/handlebars.js'
    }
    return config
  },
  transpilePackages: ['helper']
}

module.exports = nextConfig
