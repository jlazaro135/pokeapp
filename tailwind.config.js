/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        light: '#f8fafc',
        dark: '#020617',
        'secondary-light': '#e2e8f0',
        'secondary-dark': '#1e293b',
      },
    },
  },
  plugins: [],
}
