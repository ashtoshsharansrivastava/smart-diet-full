/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981', 
        "primary-dark": "#047857",
        "primary-light": "#D1FAE5",
        "background-light": "#f8fafc",
        "background-dark": "#0f172a"
      },
      fontFamily: {
        display: ["Be Vietnam Pro", "sans-serif"], // Adds the font
      }
    },
  },
  plugins: [],
}