/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      width: {
        '1/6': '16.666667%',
        '5/6': '83.333333%' 
      },
      zIndex:{
        '999999':'999999'
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

