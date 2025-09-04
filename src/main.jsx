//===============================================
//🚀 CONFIGURACIÓN REACT ROUTER - src/main.jsx
//===============================================
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './i18n/config.js';
import './index.css';

//===============================================
//⏳ COMPONENTE DE CARGA GLOBAL
//===============================================
const Loading = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#1a1a1a',
    color: '#d4af37',
    fontSize: '1.2rem',
    fontFamily: 'Inter, sans-serif'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        marginBottom: '1rem',
        fontSize: '2rem'
      }}>
        🏠
      </div>
      <div>Cargando Novaterra...</div>
    </div>
  </div>
);

//===============================================
//🏗️ RENDERIZADO CON ROUTER
//===============================================
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);