import React, { useState } from 'react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="app">
      {/* Header con logo y selector de idioma */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Logo Novaterra Lifestyle */}
            <div className="logo">
              <span className="logo-icon">✦</span>
              Novaterra Lifestyle
            </div>
            
            {/* Selector de idioma - siempre arriba derecha */}
            <div className="language-selector">
              <select className="language-dropdown" defaultValue="es">
                <option value="es">🇪🇸 Español</option>
                <option value="en">🇬🇧 English</option>
                <option value="ru">🇷🇺 Русский</option>
                <option value="ro">🇷🇴 Română</option>
                <option value="sv">🇸🇪 Svenska</option>
                <option value="no">🇳🇴 Norsk</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="main">
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Tu Nuevo Hogar Premium en España Te Espera
              </h1>
              <p className="hero-subtitle">
                Descubre inmuebles exclusivos en Cantabria y vive experiencias únicas 
                en el norte de España. Acompañamiento completo para compradores internacionales.
              </p>
              
              <div className="cta-group">
                <button className="btn btn-primary">
                  Acceder al Catálogo Completo
                </button>
                <button className="btn btn-secondary">
                  Registrarse Gratis
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Status de configuración */}
        <section className="status-section">
          <div className="container">
            <div className="status-card">
              <h2>✅ ¡Configuración Base Exitosa!</h2>
              <p>El servidor de desarrollo está funcionando correctamente.</p>
              
              <div className="tech-status">
                <div className="tech-item">
                  <span className="tech-icon">⚛️</span>
                  <span>React 18</span>
                  <span className="status-ok">OK</span>
                </div>
                
                <div className="tech-item">
                  <span className="tech-icon">⚡</span>
                  <span>Vite Build</span>
                  <span className="status-ok">OK</span>
                </div>
                
                <div className="tech-item">
                  <span className="tech-icon">🎨</span>
                  <span>SCSS Variables</span>
                  <span className="status-ok">OK</span>
                </div>
                
                <div className="tech-item">
                  <span className="tech-icon">🌍</span>
                  <span>i18n Ready</span>
                  <span className="status-pending">Pendiente</span>
                </div>
                
                <div className="tech-item">
                  <span className="tech-icon">🔐</span>
                  <span>Auth System</span>
                  <span className="status-pending">Pendiente</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer básico */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Novaterra Lifestyle. Inmuebles premium en Cantabria.</p>
        </div>
      </footer>
    </div>
  )
}

export default App