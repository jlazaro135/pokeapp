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
        'secondary-light': '#cbd5e1',
        'secondary-dark': '#1e293b',
      },
    },
  },
  plugins: [],
}
