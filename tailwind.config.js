/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
    "!./node_modules/**"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        'crextio-bg': '#FDFBF7',
        'crextio-yellow': '#FDE047',
        'crextio-dark': '#1F2937',
        'crextio-card': '#FFFFFF',
        'crextio-gray': '#9CA3AF',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}
