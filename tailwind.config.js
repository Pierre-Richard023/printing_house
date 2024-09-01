/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./assets/**/*.js",
    "./assets/**/*.jsx",
    "./templates/**/*.html.twig",
  ],
  darkMode: 'class',
  theme: {

    extend: {
      colors: {
        primary: '#008080',
        secondary: '#F1C40F',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}