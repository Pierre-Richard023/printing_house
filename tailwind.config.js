/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./assets/**/*.js",
    "./assets/**/*.jsx",
    "./templates/**/*.html.twig",
  ],
  theme: {
    colors: {

      black: colors.black,
      white: colors.white,
      rose: colors.rose,
      pink: colors.pink,
      purple: colors.purple,
      violet: colors.violet,
      blue: colors.blue,
      green: colors.green,
      yellow: colors.yellow,
      orange: colors.orange,
      red: colors.red,
      gray: colors.gray,
      primary: '#008080',
      secondary: '#F1C40F',

    },

    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}