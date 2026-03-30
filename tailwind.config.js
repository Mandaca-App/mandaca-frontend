/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#C34342',
        secondary: '#EAEAEA',
        light: '#FFFFFF',
        dark: '#2C2C2C',
        background: '#F8F7FA',
      }
    },
  },
  plugins: [],
}