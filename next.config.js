const nextConfig = {
  output: 'export',
  distDir: 'build',
  trailingSlash: true,

  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85, 100],
  },

  experimental: {
    optimizePackageImports: ['react-player', 'react-scroll', 'react-dom'],
    webVitalsAttribution: ['CLS', 'LCP'],
    scrollRestoration: true,
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
    styledComponents: false,
    emotion: true,
  },

  poweredByHeader: false,
  generateEtags: false,
  compress: true,
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: false,
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  webpack: (config, { dev, isServer }) => {
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

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  ...(process.env.ANALYZE === 'true' && {
    webpack: config => {
      config.plugins.push(
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        new (require('@next/bundle-analyzer'))({
          enabled: true,
          openAnalyzer: true,
        })
      );
      return config;
    },
  }),

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
