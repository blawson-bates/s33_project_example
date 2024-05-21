/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

// https://tailwindcss.com/docs/customizing-colors#adding-additional-colors

export default withMT({
  content: ["./**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bates: {
          light: "#981328",
          DEFAULT: "#981328",
          dark: "#881124",
        },
      },
    },
  },
  plugins: [],
});
