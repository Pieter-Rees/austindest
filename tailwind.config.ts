import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    brightness: {
      0.4: '.4',
      175: '1.75',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: 'rgba(10, 10, 10, 1)',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silver: '#ecebff',
      bubblegum: '#ff69b4',
      bermuda: '#78dcca',
      red: 'rgba(255, 0, 0, 1)',
      blue: 'rgba(0, 100, 200, 1)',
      shine: '#fff',
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
        950: '#082f49',
      },
    },
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fade-in 0.5s ease-in-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
    fontFamily: {
      sans: ['var(--font-inter)'],
      mono: ['var(--font-roboto-mono)'],
      monoton: ['var(--font-monoton)'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
export default config;
