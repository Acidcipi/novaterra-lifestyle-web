import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  
  // Resolución de rutas
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@auth': resolve(__dirname, './src/auth'),
      '@i18n': resolve(__dirname, './src/i18n'),
      '@styles': resolve(__dirname, './src/styles'),
      '@real-estate': resolve(__dirname, './src/real-estate'),
      '@experiences': resolve(__dirname, './src/experiences'),
      '@security': resolve(__dirname, './src/security'),
      '@utils': resolve(__dirname, './src/utils'),
      '@api': resolve(__dirname, './src/api')
    }
  },

  // Optimización de build
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendors principales
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'i18n': ['i18next', 'react-i18next'],
          'auth': ['jose', 'crypto-js'],
          'state': ['zustand']
        }
      }
    },
    // Optimización para Core Web Vitals
    chunkSizeWarningLimit: 1000,
    sourcemap: true
  },

  // Optimización de desarrollo
  server: {
    port: 3000,
    host: true,
    // Headers de seguridad en desarrollo
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  },

  // Configuración de CSS
  css: {
    modules: {
    localsConvention: 'camelCase'
    }
  },
  // Optimizaciones de rendimiento
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'zustand', 'i18next', 'react-i18next']
  },

  // Variables de entorno
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString())
  }
})