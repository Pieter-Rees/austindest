const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {
      flexbox: 'no-2009',
      grid: 'autoplace',
    },
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
            normalizeWhitespace: true,
            colormin: true,
            minifySelectors: true,
            mergeLonghand: true,
            mergeRules: true,
            minifyFontValues: true,
            minifyGradients: true,
            minifyParams: true,
            minifyTimingFunctions: true,
            normalizeUrl: true,
            orderedValues: true,
            reduceIdents: true,
            svgo: true,
            uniqueSelectors: true,
            zindex: false,
          },
        ],
      },
    }),
  },
};

export default config;
