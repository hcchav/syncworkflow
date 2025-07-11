/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      animation: {
        'scan': 'scan 2s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { top: '0', opacity: '0.8' },
          '50%': { top: '100%', opacity: '0.5' },
          '50.1%': { top: '0', opacity: '0' },
          '100%': { top: '0', opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
