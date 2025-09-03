import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssAspectRatio from "@tailwindcss/aspect-ratio";

export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
    extend: {
       colors: {
        // custom dark colors
        darkbg: '#000000',
        darktext: '#ffffff',
      }
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssAspectRatio],
};
