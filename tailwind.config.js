 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: '#0d0d16',

        surface: {
          DEFAULT: '#13131b',
          dim: '#0f0f17',
          card: '#1b1b23',
          cardHover: '#242430',
        },

        primary: {
          DEFAULT: '#00f0ff',
          hover: '#38f8ff',
        },
      },
    },
  },

  plugins: [],
};