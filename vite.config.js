import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    allowNodeBuiltins: ['three'], // Allows importing non-ESM packages like Three.js
  },
})
