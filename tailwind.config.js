/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0A0E14', // primary dark background
          panel: '#12161F',  // secondary panel background
        },
        accent: {
          DEFAULT: '#00F0FF', // electric cyan (primary)
          cyan: '#00F0FF',
          lime: '#D4FF00',
        },
        alert: '#FF3E3E', // racing red, reserved for real errors/warnings — not CTAs
        ink: {
          DEFAULT: '#F5F5F5', // primary text
          muted: '#8A93A3',   // muted text
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', '"Rajdhani"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
