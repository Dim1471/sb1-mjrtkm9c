/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6ED',
          200: '#F5ECD8',
          300: '#EFE2C3',
          400: '#E9D8AE',
          500: '#E3CE99',
        },
      },
    },
  },
  plugins: [],
};