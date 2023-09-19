/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    output: "export",
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
