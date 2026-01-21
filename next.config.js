/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/": ["./content/articles/**/*"],
    },
  },
};

module.exports = nextConfig;
