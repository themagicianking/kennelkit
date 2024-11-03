/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Averia Sans Libre", "sans-serif"],
      serif: ["Averia Serif Libre", "serif"],
      body: ["Averia Serif Libre", "serif"],
      display: ["Delius Unicase", "cursive"],
    },
    extend: {
      colors: {
        jet: "#2e2e2e",
        cyclamen: "#ff76a8",
        "atomic-tangerine": "#f99c7b",
        saffron: "#f2c14e",
        "tea-green": "#c1e093",
        aquamarine: "#90ffd8",
      },
    },
  },
  plugins: [],
});
