/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {},
    fontFamily: {
      nice: ['Rowdies', 'cursive'],
      roboto: ['Roboto', 'sans-serif']
    }
  },
  plugins: []
}
