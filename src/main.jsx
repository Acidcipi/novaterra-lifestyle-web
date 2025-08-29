import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/variables.scss'

// Importar CSS global base
import './styles/global.css'

// Configuración de desarrollo - mostrar errores detallados
if (import.meta.env.DEV) {
  console.log('🚀 Novaterra Lifestyle - Modo Desarrollo')
  console.log('📍 Versión:', import.meta.env.VITE_APP_VERSION || '1.0.0')
}

// Crear root de React 18 y montar aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)