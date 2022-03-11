module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        gray: {
          DEFAULT: "#E5E5E5",
          dark: "#2F2929",
        },
        red: {
          light: "#DC1818",
          DEFAULT: "#C61414",
          dark: "#950F0F"
        },
        brown: "#130202",
        grayLi: "#A19999"
      },
      fontFamily: {
        body: ["Quicksand"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
