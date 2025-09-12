/** @type {import('prettier').Config} */
const config = {
  // Core formatting
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,

  // Line formatting
  printWidth: 80,
  endOfLine: 'lf',
  insertPragma: false,
  requirePragma: false,

  // JSX formatting
  jsxSingleQuote: true,
  jsxBracketSameLine: false,

  // Other formatting
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  rangeStart: 0,
  rangeEnd: Infinity,

  // File-specific overrides
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
    {
      files: '*.{yml,yaml}',
      options: {
        tabWidth: 2,
        singleQuote: false,
      },
    },
  ],
};

export default config;
