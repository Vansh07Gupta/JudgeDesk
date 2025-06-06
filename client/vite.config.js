import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@': resolve(__dirname, 'src'),
      'tldraw': resolve(__dirname, 'src/polyfills/tldrawPolyfill.js')
    },
    dedupe: ['@tldraw/tldraw', 'tldraw']
  },
  optimizeDeps: {
    include: ['@tldraw/tldraw', 'tldraw']
  }
})
