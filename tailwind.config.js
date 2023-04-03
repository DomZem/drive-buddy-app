/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'rich-black': '#111827',
        onyx: '#1f2937',
        'slate-gray': '#f3f4f6',
        silver: '#d1d5db',
        primary: '#2563eb',
        error: '#dc2626',
      },
      screens: {
        xs: '525px',
      },
    },
  },
  plugins: [],
};
// colors in tailwind palette
// rich-black --> gray-900
// onyx --> gray-800
// slate-gray --> gray-100
// silver --> gray-300
// primary --> blue-600
// error --> red-600
