/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
  ],
  theme: {
    colors: {
      'blue': colors.blue,
      'purple': colors.purple,
      'pink': colors.pink,
      'orange': colors.orange,
      'green': colors.green,
      'yellow': colors.yellow,
      'gray': colors.gray,
      'white':colors.white,
      'primary':'#008080',
      'secondary':'#F1C40F',

    },

    extend: {
    },
  },
  plugins: [

  ],
}
