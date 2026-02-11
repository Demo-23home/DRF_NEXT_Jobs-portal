/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    MAP_BOX: process.env.MAP_BOX,
  },
};

module.exports = nextConfig;
