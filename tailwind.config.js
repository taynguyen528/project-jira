/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        "science-blue": {
          DEFAULT: "#0052CC",
          50: "#85B6FF",
          100: "#70AAFF",
          200: "#4791FF",
          300: "#1F79FF",
          400: "#0062F5",
          500: "#0052CC",
          600: "#003B94",
          700: "#00255C",
          800: "#000E24",
          900: "#000000",
        },
        "pickled-bluewood": {
          DEFAULT: "#344563",
          50: "#8CA0C3",
          100: "#7F95BC",
          200: "#647FAE",
          300: "#506A98",
          400: "#42587E",
          500: "#344563",
          600: "#212B3E",
          700: "#0D1219",
          800: "#000000",
          900: "#000000",
        },
      },
      boxShadow: {
        "card-task-shadow":
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};
