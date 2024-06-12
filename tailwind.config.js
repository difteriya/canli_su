/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans]
    },

    extend: {
      colors: {
        th: {
          50: "#f9fafb",
          100: "#ebf8fd",
          // 200: "#e8e8e8",
          // 300: "#d6d6d6",
          // 400: "#bdbdbd",
          // 500: "#9e9e9e",
          600: "#3db7e7",
          700: "#004080",
          800: "#002a54"
          // 900: "#000000"
        }
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "base" // only generate global styles
      // strategy: "class" // only generate classes
    }),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp")
  ]
};
