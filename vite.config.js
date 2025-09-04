//===============================================
//⚙️ CONFIGURACIÓN VITE SIMPLE Y FUNCIONAL
//===============================================
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Configuración básica de servidor
  server: {
    port: 3000,
    host: true
  },
  
  // Configuración de build simple
  build: {
    outDir: 'dist',
    sourcemap: false, // Más rápido sin sourcemaps
    minify: true
  },
  
  // Alias básicos
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})