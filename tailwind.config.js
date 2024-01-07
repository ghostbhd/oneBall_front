/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        bLight_1: "#98c0cf",
        bLight_2: "#8dc7d4",
        bLight_3: "#97e3f4",
        bLight_4: "#6398a4",
        bLight_5: "#558792",
        bLight_6: "#90BFE8",
        bDark_1: "#406774",
        bDark_2: "#395f6d",
        bDark_3: "#2a515e",
        bDark_4: "#204753",
        bDark_5: "#001216",
        org_1: "#ffe268",
        org_2: "#ffb037",
        org_3: "#ea8d00",
        err:   "#FF0000",
        greenclr: "#4CA833",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        HappySerif: ["Happy Serif", "sans-serif"],

      },
      boxShadow: {
        "3xl": "0 25px 50px -12px rgb(0 0 0 / 0.5)",
        "4xl": "0 0 60px -12px rgb(0 0 0 / 0.4)",
        "5xl": "-4px 4px 40px -12px rgb(0 0 0 / 1)",
        btn: "0 0px 50px -12px rgb(0 0 0 / 0.3)",
        sBar: "20px 0 40px -12px rgb(0 0 0 / 0.4)",
        login: "inset 20px 20px 44px 0 rgb(255 255 255 / 0.1),\
          0 0 60px -12px rgb(0 0 0 / 0.4)"
      },
      borderRadius: {
        "4xl": "2rem",
      },
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
};
