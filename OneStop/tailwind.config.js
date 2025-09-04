/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: "class", 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
    },
  },
  plugins: [tailwindcssAnimate], 
};