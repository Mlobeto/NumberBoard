// tailwind.config.js
export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
      secondary: "#421261",
      verde:"#FEE202"
      
    },},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
