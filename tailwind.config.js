/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#020202',
        inputBorder: '#808080'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        notoThai: ['Noto Sans Thai', 'sans-serif']
      },
      screens: {
        'desktop': '1200px',
        'mobile': '744px'
      }

    },
  },
  plugins: [],
}