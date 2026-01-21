/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    // Include all article files in the server bundle
    "/": ["./content/articles/**/*"],
  },
};

module.exports = nextConfig;
