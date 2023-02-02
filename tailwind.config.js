module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          100: '#F0EBD5',
        },
      },
      fontFamily: {
        serif: ['Balthazar', 'serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
