/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'black': '#000000',
        'white': '#FFFFFF',
        'blue': '#0088FF',
      }
    },
    keyframes: {
      scrolling: {
        '0%': { transform: 'translateX(0)'},
        '100%': { transform: 'translateX(-100%)'}
      }
    },
    animation: {
      scrollRightToLeft: 'scrolling 60s linear infinite'
    }
  },
  plugins: [],
}
