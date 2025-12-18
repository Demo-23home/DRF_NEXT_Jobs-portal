/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: process.env.API_URL,
    MAP_BOX: process.env.MAP_BOX,
  },
};

module.exports = nextConfig;
