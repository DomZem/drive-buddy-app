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
        white: '#ffffff',
        blue: '#2563eb',
        red: '#dc2626',
      },
    },
  },
  plugins: [],
};
