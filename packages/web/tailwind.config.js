module.exports = {
  content: ["./app/**/*.tsx"],
  plugins: [require("daisyui")],
  theme: {
    colors: {
      text: {
        50: "hsl(0, 0%, 98%)",
        100: "hsl(240, 5%, 96%)",
        200: "hsl(240, 6%, 90%)",
        300: "hsl(240, 5%, 84%)",
        400: "hsl(240, 5%, 65%)",
        DEFAULT: "hsl(240, 4%, 46%)",
        600: "hsl(240, 5%, 34%)",
        700: "hsl(240, 5%, 26%)",
        800: "hsl(240, 4%, 16%)",
        900: "hsl(240, 6%, 10%)",
      },
      blue: {
        100: "#d0cdfa",
        200: "#9795b5",
        300: "#636175",
        400: "#32323a",
        DEFAULT: "#382bf0",
        600: "#3223ae",
        700: "#291b71",
        800: "#1b1239",
        900: "#000000",
      },
      gray: {
        50: "hsl(0, 0%, 98%)",
        100: "hsl(0, 0%, 96%)",
        200: "hsl(0, 0%, 90%)",
        300: "hsl(0, 0%, 83%)",
        400: "hsl(0, 0%, 64%)",
        DEFAULT: "hsl(0, 0%, 45%)",
        600: "hsl(0, 0%, 32%)",
        700: "hsl(0, 0%, 25%)",
        800: "hsl(0, 0%, 15%)",
        900: "hsl(0, 0%, 9%);",
      },
      lightBlue: {
        100: "#bae9ff",
        200: "#88a9b9",
        300: "#596d77",
        400: "#2e373b",
        DEFAULT: "#03a9f4",
        600: "#1e7cb1",
        700: "#1f5172",
        800: "#172b39",
        900: "#000000",
      },
      yellowWarning: {
        100: "#fff9bf",
        200: "#b9b48b",
        300: "#77745b",
        400: "#3b3a2f",
        DEFAULT: "#ffeb3b",
        600: "#b9aa31",
        700: "#786e26",
        800: "#3c3718",
        900: "#000000",
      },
      amberRed: {
        100: "#f5aea9",
        200: "#b27f7c",
        300: "#735451",
        400: "#3a2c2b",
        DEFAULT: "#f44336",
        600: "#b2362a",
        700: "#74281f",
        800: "#3c1913",
        900: "#000000",
      },
      lightGreen: {
        100: "#a8ffab",
        200: "#7cb97d",
        300: "#527752",
        400: "#2b3b2b",
        DEFAULT: "#47ff4e",
        600: "#3cb93d",
        700: "#2f772c",
        800: "#1e3c1b",
        900: "#000000",
      },
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.875rem",
      "3xl": "2.25rem",
      "4xl": "3rem",
      "5xl": "3.75rem",
      "6xl": "4.5rem",
      "7xl": "6rem",
      "8xl": "8rem",
      "9xl": "10.5rem",
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: [
        "ui-monospace",
        "Menlo",
        "Monaco",
        "Cascadia Mono",
        "Segoe UI Mono",
        "Roboto Mono",
        "Oxygen Mono",
        "Ubuntu Monospace",
        "Source Code Pro",
        "Fira Mono",
        "Droid Sans Mono",
        "Courier New",
        "monospace",
      ],
      display: ["Oswald"],
      body: ['"Open Sans"'],
    },
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    lineHeight: {
      3: ".75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      11: "5rem",
      12: "11.5rem",
    },
  },
  daisyui: {
    base: false,
  },
};
