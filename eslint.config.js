// Modern ESLint flat config for Next.js 15, React 19, TypeScript, and Prettier
import { FlatCompat } from '@eslint/eslintrc';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals.js';
import nextTypescript from 'eslint-config-next/typescript.js';

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends([nextCoreWebVitals, nextTypescript, 'plugin:@typescript-eslint/recommended', 'prettier']),
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    rules: {
      'prettier/prettier': 'error',
      'react/no-unescaped-entities': 'off',
    },
  },
];
