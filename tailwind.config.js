/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-blue": "#09357B",
        "sub-blue": "#2153A3",
      },
    },
    fontFamily: {
      "main-font": ["Roboto"],
      "serif":["Georgia"]
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity:'0'},
        "100%": { opacity:'1'},
      },
      Loading: {
        "0%": {transform:'rotate(0deg)'},
        "100%": {transform:'rotate(360deg)'},
      }
    },
    animation: {
      fadeIn: 'fadeIn 0.5s ease-in-out',
      Loading: 'Loading 2s infinite',
    },
    backgroundImage: {
      "searchIcon": "url('assets/search-icon@2x.svg')",
    },
  },
  plugins: [],
};
