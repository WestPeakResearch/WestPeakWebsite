import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@content': path.resolve(__dirname, './src/content'),
      '@data': path.resolve(__dirname, './src/data'),
      '@images': path.resolve(__dirname, './src/images')
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  define: {
    global: 'globalThis',
    'process.env': process.env
  },
  optimizeDeps: {
    include: ['buffer']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router'],
          utils: ['marked', 'gray-matter']
        }
      }
    }
  }
})