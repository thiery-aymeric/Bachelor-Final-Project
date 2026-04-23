
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:true,
    port:9002,
    proxy: {
      '/api': {
        target: 'http://localhost:1237', 
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }, 
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  }
})