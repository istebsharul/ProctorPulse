/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      poppins: ['Poppins', 'sans-serif'],
      boxShadow: {
        'inner-md': 'inset 0 4px 6px rgba(0, 0, 0, 0.3)',
        'inner-lg': 'inset 0 10px 15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
