/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./assets/**/*.js",
    "./assets/**/*.jsx",
    "./templates/**/*.html.twig",
	"./node_modules/flowbite/**/*.js", // set up the path to the flowbite package

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
	require('flowbite/plugin') // add the flowbite plugin

  ],
}