const prettierPlugin = require('eslint-plugin-prettier');
const jsxA11y = require('eslint-plugin-jsx-a11y');
// ESLint flat config for Next.js 15, React 19, TypeScript, and Prettier
const next = require('eslint-config-next');
const typescript = require('@typescript-eslint/eslint-plugin');
const prettier = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescript,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      ...next.rules,
      ...prettier.rules,
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prettier/prettier': 'error',
      'react/no-unescaped-entities': 'off',
    },
  },
];
