const nextConfig = {
  // Removed static export to enable server-side features
  // output: 'export',
  distDir: '.next', // Use default Next.js build directory
  // trailingSlash: true, // Not needed for server-side rendering

  images: {
    // Enable image optimization for server-side rendering
    // unoptimized: true, // Not needed for server-side rendering
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85, 100],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  experimental: {
    optimizePackageImports: [
      'react-player',
      'react-scroll',
      'react-dom',
      '@emotion/react',
      '@emotion/styled',
    ],
    webVitalsAttribution: ['CLS', 'LCP', 'FID', 'FCP', 'TTFB'],
    scrollRestoration: true,
    optimizeServerReact: true,
    // Advanced performance features
    serverMinification: true,
    serverSourceMaps: false,
    // Enable modern bundling
    esmExternals: true,
    // Optimize CSS
    optimizeCss: false, // Disabled due to critters dependency
  },

  // SWC minification is enabled by default in Next.js 15
  // swcMinify: true,

  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
    styledComponents: false,
    emotion: true,
    reactRemoveProperties:
      process.env.NODE_ENV === 'production'
        ? { properties: ['^data-testid$'] }
        : false,
  },

  poweredByHeader: false,
  generateEtags: false,
  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,

  // Enhanced Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security Headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://www.spotify.com https://w.soundcloud.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "media-src 'self' https://www.youtube.com https://www.spotify.com https://w.soundcloud.com",
              "connect-src 'self' https://www.youtube.com https://www.spotify.com https://w.soundcloud.com https://noembed.com",
              "frame-src 'self' https://www.youtube.com https://www.spotify.com https://w.soundcloud.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join('; '),
          },
          // HSTS (HTTP Strict Transport Security)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },

  eslint: {
    ignoreDuringBuilds: false,
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  webpack: (config, { dev, isServer, webpack }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 200000,
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 20,
            reuseExistingChunk: true,
          },
          emotion: {
            test: /[\\/]node_modules[\\/]@emotion[\\/]/,
            name: 'emotion',
            chunks: 'all',
            priority: 15,
            reuseExistingChunk: true,
          },
          reactPlayer: {
            test: /[\\/]node_modules[\\/]react-player[\\/]/,
            name: 'react-player',
            chunks: 'async',
            priority: 15,
            reuseExistingChunk: true,
          },
          reactScroll: {
            test: /[\\/]node_modules[\\/]react-scroll[\\/]/,
            name: 'react-scroll',
            chunks: 'all',
            priority: 15,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
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
      };
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.BUILD_TIME': JSON.stringify(new Date().toISOString()),
      })
    );

    return config;
  },

  ...(process.env.ANALYZE === 'true' && {
    webpack: async config => {
      const bundleAnalyzer = await import('@next/bundle-analyzer');
      const BundleAnalyzerPlugin = bundleAnalyzer.default;
      config.plugins.push(
        new BundleAnalyzerPlugin({
          enabled: true,
          openAnalyzer: true,
        })
      );
      return config;
    },
  }),
};

export default nextConfig;
