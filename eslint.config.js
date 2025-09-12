import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // Modern React rules (relaxed for existing codebase)
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-curly-brace-presence': 'off',
      'react/self-closing-comp': 'warn',
      'react/jsx-sort-props': 'off',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/consistent-type-exports': 'error',

      // General rules (relaxed for existing codebase)
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-unused-expressions': 'error',
      'prefer-template': 'warn',
      'prefer-arrow-callback': 'warn',
      'arrow-spacing': 'warn',
      'object-shorthand': 'warn',
      'prefer-destructuring': 'off',

      // Next.js specific
      '@next/next/no-img-element': 'error',
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-title-in-document-head': 'error',

      // Accessibility
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
    },
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**/*.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.config.{js,ts}'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
];

export default eslintConfig;
