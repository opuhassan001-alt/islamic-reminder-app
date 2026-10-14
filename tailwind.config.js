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
          900: '#063327',
          950: '#031912'
        },
        islamic: {
          deep: '#020b07',
          dark: '#04140e',
          card: '#082319',
          cardHover: '#0c2e21',
          surface: '#0e3425',
          border: 'rgba(16, 185, 129, 0.18)',
          accent: '#10b981',
          gold: '#eab308',
          champagne: '#fde68a',
          goldGlow: 'rgba(234, 179, 8, 0.25)'
        },
        gold: {
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12'
        }
      },
      boxShadow: {
        'islamic-glow': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'gold-glow': '0 0 25px -5px rgba(234, 179, 8, 0.3)',
        'luxury-card': '0 12px 30px -10px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(253, 230, 138, 0.15)'
      },
      fontFamily: {
        arabic: ['"Amiri"', '"Scheherazade New"', 'serif'],
        bengali: ['"Hind Siliguri"', '"Noto Serif Bengali"', 'sans-serif'],
        serifBn: ['"Noto Serif Bengali"', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Hind Siliguri"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
