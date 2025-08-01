import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  extend: {
  animation: {
    'gradient-x': 'gradient-x 8s ease infinite',
    'fade-in': 'fadeIn 1s ease-out forwards'
  },
  keyframes: {
    'gradient-x': {
      '0%, 100%': { 'background-position': '0% 50%' },
      '50%': { 'background-position': '100% 50%' },
    },
    fadeIn: {
      '0%': { opacity: 0, transform: 'translateY(20px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    }
  },
},

})
