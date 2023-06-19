/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-1": "#DA9179",
        "color-2": "#EA580C",
      },
      fontFamily: {
        default: ["var(--font-poppins)"],
        aquire: ["var(--font-aquire)"],
      },
      keyframes: {
        "left-right": {
          "0%": {
            marginLeft: 0,
          },
          "50%": {
            marginLeft: "87%",
          },
          "100%": {
            marginLeft: 0,
          },
        },
      },
      animation: {
        "left-right": "left-right 1500ms ease infinite",
      },
    },
  },
  plugins: [],
};
