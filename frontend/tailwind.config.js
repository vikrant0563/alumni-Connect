/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
      },
    },
  },

  plugins: [
    require('daisyui'), 
  ],

  daisyui: {
    themes: ["light", "dark"],
  },
};

