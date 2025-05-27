import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5888, // Client runs on 5888
    proxy: {
      '/api': {
        target: 'http://localhost:3456', // API runs on 3456
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Ensure the build works with client-side routing
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  // Ensure the app works when served from subdirectories
  base: './',
})
