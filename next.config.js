/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'build',
  trailingSlash: true,

  // Modern image optimization
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['react-player', 'react-scroll', 'react-dom'],
    webVitalsAttribution: ['CLS', 'LCP'],
    scrollRestoration: true,
  },

  // Modern compiler optimizations
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
    styledComponents: false,
    emotion: false,
  },

  // Performance optimizations
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
  reactStrictMode: true,

  // Note: Security headers are handled by the hosting provider or nginx config

  // Build optimizations
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }

    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Bundle analyzer
  ...(process.env.ANALYZE === 'true' && {
    webpack: config => {
      config.plugins.push(
        new (require('@next/bundle-analyzer'))({
          enabled: true,
          openAnalyzer: true,
        })
      );
      return config;
    },
  }),
};

export default nextConfig;
