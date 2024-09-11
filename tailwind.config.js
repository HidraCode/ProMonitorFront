//** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark-blue': '#0F1035',
        'custom-light-blue': '#7FC7D9',
        'custom-blue': '#365486'
      },
    },
  },
  plugins: [],
}