/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          850: '#064232',
          950: '#022c22'
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706'
        }
      },
      fontFamily: {
        arabic: ['"Amiri"', '"Scheherazade New"', 'serif'],
        bengali: ['"Hind Siliguri"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
