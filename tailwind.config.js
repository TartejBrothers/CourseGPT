/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-blue": "0 0px -2px 0px #032139, 0 2px 0px -2px #032139",
      },
      colors: {
        primary: {
          50: "#fdf9e7",
          100: "#fbf3cf",
          200: "#f7e7a0",
          300: "#f3db70",
          400: "#efcf41",
          500: "#E3B634",
          600: "#b6922a",
          700: "#886d1f",
          800: "#5b4915",
          900: "#2d240a",
        },
        secondary: {
          50: "#f8f8f8",
          100: "#f0f0f0",
          200: "#e4e4e4",
          300: "#d1d1d1",
          400: "#b4b4b4",
          500: "#9a9a9a",
          600: "#818181",
          700: "#6a6a6a",
          800: "#4d4d4d",
          900: "#333333",
        },
        accent: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
        },
      },
    },
  },
  plugins: [],
};
