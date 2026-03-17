/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        luxury: {
          gold: '#C9A962',
          cream: '#F5F0E8',
          charcoal: '#2C2C2C',
          sand: '#E8E2D9',
          'dark-bg': '#0f0f0f',
          'dark-card': '#1a1a1a',
          'dark-border': '#2d2d2d',
          'dark-muted': '#a3a3a3',
        },
        charcoal: '#2C2C2C',
        cream: '#F5F0E8',
      },
    },
  },
  plugins: [],
}
