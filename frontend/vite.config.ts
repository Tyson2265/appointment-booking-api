import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy /api to backend for dev (localhost:8080)
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
