/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-green": "#004C15",
        "light-white": "rgba(255,255,255,0.17)",
      },
    },
  },
  plugins: [],
}
