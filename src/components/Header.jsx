//===============================================
//📸 HEADER SOLO NAVEGACIÓN - src/components/Header.jsx
//===============================================
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../i18n/config';

const Header = ({ onLoginClick }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  
  //===============================================
  //🎠 ESTADO PARA CARRUSEL DE IMÁGENES
  //===============================================
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  
  // Array directo de imágenes locales
  const headerImages = [
    '/images/header/cabarceno.jpg',
    '/images/header/tina-menor.jpg',
    '/images/header/castro.jpg',
    '/images/header/saltacaballo.jpg',
    '/images/header/la-magdalena.jpg'
  ];

  //===============================================
  //⚙️ EFECTO PARA ROTACIÓN AUTOMÁTICA DE IMÁGENES
  //===============================================
  useEffect(() => {
    // Solo ejecutar carrusel en la página de inicio
    if (location.pathname !== '/') return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % headerImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [headerImages.length, location.pathname]);

  //===============================================
  //🌍 MANEJADOR DE CAMBIO DE IDIOMA CON BANDERAS
  //===============================================
  const handleLanguageChange = useCallback((event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('novaterra-language', newLanguage);
  }, [i18n]);

  // Función corregida para obtener la bandera del país
  const getLanguageDisplay = (language) => {
    const languages = {
      'es': '🇪🇸 Español',
      'en': '🇬🇧 English',
      'fr': '🇫🇷 Français',
      'de': '🇩🇪 Deutsch',
      'it': '🇮🇹 Italiano'
    };
    return languages[language] || `🌍 ${language.toUpperCase()}`;
  };

  //===============================================
  //📱 MANEJADORES MENU DESPLEGABLE SERVICIOS
  //===============================================
  const toggleServicesMenu = useCallback(() => {
    setIsServicesOpen(prev => !prev);
  }, []);

  const closeServicesMenu = useCallback(() => {
    setIsServicesOpen(false);
  }, []);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-dropdown')) {
        closeServicesMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [closeServicesMenu]);

  //===============================================
  //🎨 RENDERIZADO DEL COMPONENTE
  //===============================================
  return (
    <header className="header-container">
      {/* --------BARRA DE NAVEGACIÓN SIEMPRE VISIBLE-------- */}
      <nav className="navigation-bar">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <h2>Novaterra</h2>
          </Link>
        </div>

        {/* Enlaces de navegación - SIN CONTACTO */}
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Inicio
          </Link>
          
          <Link 
            to="/propiedades" 
            className={`nav-link ${location.pathname === '/propiedades' ? 'active' : ''}`}
          >
            Propiedades
          </Link>
          
          <Link 
            to="/experiencias" 
            className={`nav-link ${location.pathname === '/experiencias' ? 'active' : ''}`}
          >
            Experiencias
          </Link>
          
          {/* Dropdown de Servicios */}
          <div className="nav-dropdown">
            <span 
              className={`nav-link dropdown-trigger ${
                location.pathname === '/servicios' || location.pathname === '/servicios-premium' ? 'active' : ''
              }`}
              onClick={toggleServicesMenu}
            >
              Servicios ▼
            </span>
            
            {isServicesOpen && (
              <div className="dropdown-menu">
                <Link 
                  to="/servicios" 
                  className="dropdown-item"
                  onClick={closeServicesMenu}
                >
                  Servicios Básicos
                </Link>
                <Link 
                  to="/servicios-premium" 
                  className="dropdown-item"
                  onClick={closeServicesMenu}
                >
                  Servicios Premium
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Acciones del header - LOGIN PRIMERO */}
        <div className="header-actions">
          {/* Login PRIMERO (izquierda) */}
          <button 
            className="login-btn"
            onClick={onLoginClick}
            aria-label="Iniciar sesión"
          >
            Iniciar Sesión
          </button>
          
          {/* Idioma SEGUNDO (derecha) con banderas corregidas */}
          <div className="language-selector">
            <select 
              value={i18n.language} 
              onChange={handleLanguageChange}
              aria-label="Seleccionar idioma"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang} value={lang}>
                  {getLanguageDisplay(lang)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>

      {/* --------IMAGEN HERO CON CARRUSEL - SOLO EN HOME-------- */}
      {location.pathname === '/' && (
        <>
          <div className="hero-image-container">
            <img 
              src={headerImages[currentImageIndex]}
              alt={`Vista ${currentImageIndex + 1} de Cantabria`}
              className="hero-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/1200x600/1a1a1a/d4af37?text=Novaterra+Cantabria';
              }}
            />
            
            {/* Indicadores del carrusel */}
            <div className="carousel-indicators">
              {headerImages.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>

            {/* Navegación del carrusel */}
            <button 
              className="carousel-nav carousel-prev"
              onClick={() => setCurrentImageIndex(
                currentImageIndex === 0 ? headerImages.length - 1 : currentImageIndex - 1
              )}
              aria-label="Imagen anterior"
            >
              &#8249;
            </button>
            <button 
              className="carousel-nav carousel-next"
              onClick={() => setCurrentImageIndex(
                (currentImageIndex + 1) % headerImages.length
              )}
              aria-label="Siguiente imagen"
            >
              &#8250;
            </button>
          </div>

          {/* --------CONTENIDO HERO SOLO EN HOME-------- */}
          <section className="hero-content-section">
            <div className="hero-text-content">
              <h1 className="hero-main-title">
                Descubre Cantabria
              </h1>
              <p className="hero-main-subtitle">
                Propiedades exclusivas y experiencias premium
              </p>
              <button className="hero-cta-button">
                Explorar Propiedades
              </button>
            </div>
          </section>
        </>
      )}
    </header>
  );
};

export default Header;