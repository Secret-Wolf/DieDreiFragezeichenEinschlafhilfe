/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Die drei ??? themed colors
        'bob': {
          DEFAULT: '#E53935',
          light: '#FF6F60',
          dark: '#AB000D',
        },
        'peter': {
          DEFAULT: '#1E88E5',
          light: '#6AB7FF',
          dark: '#005CB2',
        },
        'justus': {
          DEFAULT: '#424242',
          light: '#6D6D6D',
          dark: '#1B1B1B',
        },
      },
    },
  },
  plugins: [],
}
