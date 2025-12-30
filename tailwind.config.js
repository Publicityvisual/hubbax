/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#ededed",
        primary: {
          DEFAULT: "#e63946", // A strong premium red
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1a1a1a",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#e63946",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // We'll need to link this or use system
      },
    },
  },
  plugins: [],
};
