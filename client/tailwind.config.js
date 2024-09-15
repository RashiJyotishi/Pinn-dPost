/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blueBg': "#3B95FF",
        'offWhite': "#F8F9F1",
        'font-grey': "#9B9B9B",
        'white': "#FFFFFF",
      },
    },
  },
  plugins: [],
}