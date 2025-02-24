/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Noto Sans TC", "sans-serif"],
    },
    extend: {
      colors: {
        grey: {
          light: "#f7f7f7",
          dark: "#939292",
        },
        "dark-mode-grey": {
          100: "#545454",
          200: "#1a1a1a",
          300: "#242424",
        },
        black: "#2D2D2D",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
