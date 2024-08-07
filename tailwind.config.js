/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.html'],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '7rem',
        '2xl': '8rem',
      },
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
}

