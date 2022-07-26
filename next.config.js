/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_EMAIL: process.env.SENDGRID_EMAIL,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_AUTH_URI: process.env.MONGODB_AUTH_URI,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    JWT_SECRET: process.env.JWT_SECRET
  },
  images: {
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
