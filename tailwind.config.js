/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: {
          light: "#f7f7f7",
          dark: "#939292",
        },
        black: {
          default: "#2D2D2D",
        },
      },
      fontFamily: {
        noto: ["Noto Sans TC", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
