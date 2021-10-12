module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0px 4px 32px rgba(0, 0, 0, 0.08)",
        bottom: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        DEFAULT: "16px",
        option: "52px",
      },
      fontSize: {
        display: ["56px", "84px"],
        title: ["40px", "60px"],
        headline: ["32px", "48px"],
        header: ["24px", "36px"],
        subheader: ["20px", "30px"],
        body: ["16px", "24px"],
        caption: ["14px", "21px"],
        small: ["12px", "18px"],
      },
      colors: {
        primary: {
          900: "#2F1816",
          800: "#4E2825",
          700: "#6E3935",
          600: "#7F423D",
          500: "#8C4843",
          400: "#BB7772",
          300: "#CA9591",
          200: "#E1C2C0",
          100: "#F7EFEF",
          50: "#FCF8F8",
        },
        accent: {
          900: "#2C2E1A",
          800: "#484B2B",
          700: "#676C3E",
          600: "#797E49",
          500: "#868C51",
          400: "#AFB47D",
          300: "#BFC498",
          200: "#DCDFC6",
          100: "#F6F7F0",
          50: "#FBFBF9",
        },
        success: {
          900: "#0B3B18",
          800: "#116125",
          700: "#198A33",
          600: "#20B03F",
          500: "#26D748",
          400: "#4DDE69",
          300: "#74E58A",
          200: "#B0F0BC",
          100: "#EBFBEE",
          50: "#F5FFF7",
        },
        black: {
          neutral: {
            1000: "#000000",
            900: "#141414",
            800: "#242424",
            700: "#333333",
            600: "#424242",
            500: "#525252",
          },
          cool: {
            900: "#17181A",
            800: "#1F2124",
            700: "#292E33",
            600: "#313B42",
            500: "#374652",
          },
          warm: {
            900: "#1A1917",
            800: "#24221F",
            700: "#332F29",
            600: "#423C31",
            500: "#524837",
          },
        },
        gray: {
          neutral: {
            400: "#7A7A7A",
            300: "#A3A3A3",
            200: "#CCCCCC",
            100: "#EBEBEB",
          },
          cool: {
            400: "#5D6D7A",
            300: "#8998A3",
            200: "#BCC4CC",
            100: "#E1E7EB",
          },
          warm: {
            400: "#7A705D",
            300: "#A39A89",
            200: "#CCC6BC",
            100: "#EBE7E1",
          },
        },
        white: {
          neutral: {
            50: "#F7F7F7",
          },
          cool: {
            50: "#F0F3F5",
          },
          warm: {
            50: "#F5F3F0",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
