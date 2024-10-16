/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Averia Sans Libre", "sans-serif"],
      serif: ["Averia Serif Libre", "serif"],
      body: ["Averia Serif Libre", "serif"]
    },
    extend: {},
  },
  plugins: [],
});
