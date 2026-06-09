/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "navy": "hsl(214, 60%, 16%)",
        "navy-light": "hsl(214, 50%, 22%)",
        "red-news": "hsl(0, 85%, 45%)",
        "red-news-light": "hsl(0, 85%, 55%)",
        "charcoal": "hsl(0, 0%, 18%)",
        "gray-news": "hsl(0, 0%, 45%)",
        "gray-light": "hsl(0, 0%, 96%)",
      },
      fontFamily: {
        heading: ["Georgia", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

