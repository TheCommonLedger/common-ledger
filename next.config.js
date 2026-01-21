/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/": ["./content/articles/**/*"],
  },
};

module.exports = nextConfig;

