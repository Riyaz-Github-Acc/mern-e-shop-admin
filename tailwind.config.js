/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#1c1c43",
        "light-blue": "#141432",
        "light-gray": "#CBCBCB",
        "semi-white": "#FCFFFF",
        "hover-color": "#2A335E",
        "light-white": "rgba(255,255,255,0.17)",
        "light-white-opacity": "rgba(244,244,244,0.35)",
      },
    },
  },
  plugins: [],
};
