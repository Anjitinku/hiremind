/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          500: '#6366f1',
          600: '#4f46e5',
        },
        accent: {
          500: '#f97316',
        }
      }
    },
  },
  plugins: [],
}
