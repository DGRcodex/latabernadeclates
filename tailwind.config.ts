import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brutal-bg': '#F3EFE0',  // Warm Bone/Paper
        'brutal-dark': '#121212', // Near Black
        'brutal-accent': '#D9450E', // Burnt Orange
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-hover': '2px 2px 0px 0px #000000',
      },
      borderRadius: {
        'none': '0px',
      }
    },
  },
  plugins: [typography],
};

export default config;
