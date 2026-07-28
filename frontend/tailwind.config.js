/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        ripple: {
          '0%': { width: '0px', height: '0px', opacity: '1' },
          '100%': { width: '400px', height: '400px', opacity: '0' },
        },
      },
      animation: {
        ripple: 'ripple 2s ease-out forwards',
      },
    },
  },
  plugins: [],
};
