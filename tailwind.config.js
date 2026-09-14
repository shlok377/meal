/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        script: ['"Caveat"', '"Great Vibes"', 'cursive'],
      },
      colors: {
        diner: {
          bg: '#F7F3EA',
          card: '#EFE9DC',
          text: '#141414',
          subtext: '#524F49',
          accent: '#9B2226',
          gold: '#C88D27',
          border: 'rgba(20, 20, 20, 0.12)',
        },
        smokehouse: {
          bg: '#131316',
          card: '#1C1C22',
          text: '#EDE8DF',
          subtext: '#9E9AA0',
          accent: '#F59E0B',
          gold: '#FBBF24',
          border: 'rgba(237, 232, 223, 0.12)',
        },
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
