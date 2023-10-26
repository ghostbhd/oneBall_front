/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        blue_light_1: "#98c0cf",
        blue_light_2: "#8dc7d4",
        blue_light_3: "#97e3f4",
        blue_light_4: "#6398a4",
        blue_light_5: "#558792",
        blue_dark_1: "#406774",
        blue_dark_2: "#395f6d",
        blue_dark_3: "#2a515e",
        blue_dark_4: "#204753",
        orange_1: "#ffe268",
        orange_2: "#ffb037",
        orange_3: "#ea8d00"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        '3xl': '0 25px 50px 0 rgb(#000, 0.5)',
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}
