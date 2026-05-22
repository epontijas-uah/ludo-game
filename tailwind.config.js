/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: '#333333',
        brandgreen: '#00E676',
        goldaccent: '#B8860B',
        darkcard: '#222222',
        darkborder: '#4a4a4a',
        coral: '#FF6F61'
      }
    }
  },
  plugins: [],
}