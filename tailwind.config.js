/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#64FFDA',
        secondary: '#BB86FC',
        darkBg: '#0F0F0F',
        lightBg: '#F8F8F8',
        textPrimary: '#F8F8F8',
        textSecondary: '#A1A1A1',
        textDark: '#0F0F0F',
        textDarkSecondary: '#4A4A4A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.primary"), 0 0 20px rgba(100, 255, 218, 0.2)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 