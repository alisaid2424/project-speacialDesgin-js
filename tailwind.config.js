/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./js/*.js"],
  theme: {
    container : {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        primary: "var(--main-color)",
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

