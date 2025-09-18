export const buildConfig = {
  production: {
    NODE_ENV: 'production',
    NEXT_TELEMETRY_DISABLED: '1',
  },
  development: {
    NODE_ENV: 'development',
    NEXT_TELEMETRY_DISABLED: '1',
  },
};

export const optimizationSettings = {
  webpack: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
        },
        emotion: {
          test: /[\\/]node_modules[\\/]@emotion[\\/]/,
          name: 'emotion',
          chunks: 'all',
          priority: 20,
          reuseExistingChunk: true,
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 30,
          reuseExistingChunk: true,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5,
          enforce: true,
          reuseExistingChunk: true,
        },
      },
    },
  },
  css: {
    purge: true,
    minify: true,
    optimize: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    quality: 85,
    compression: 'high',
  },
};
