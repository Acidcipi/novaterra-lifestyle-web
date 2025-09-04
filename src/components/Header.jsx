//===============================================
//📸 HEADER DEFINITIVO CORREGIDO - src/components/Header.jsx
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
  //⚙️ EFECTO PARA ROTACIÓN AUTOMÁTICA - EN TODAS LAS PÁGINAS
  //===============================================
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % headerImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [headerImages.length]);

  //===============================================
  //🌍 MANEJADOR DE CAMBIO DE IDIOMA CON TODAS LAS BANDERAS
  //===============================================
  const handleLanguageChange = useCallback((event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('novaterra-language', newLanguage);
  }, [i18n]);

  // TODAS las banderas para TODOS los idiomas de tu config
  const getLanguageDisplay = (language) => {
    const languages = {
      'es': '🇪🇸 Español',
      'en': '🇬🇧 English', 
      'ru': '🇷🇺 Русский',
      'ro': '🇷🇴 Română',
      'pl': '🇵🇱 Polski',
      'uk': '🇺🇦 Українська',
      'mk': '🇲🇰 Македонски',
      'de': '🇩🇪 Deutsch',
      'fr': '🇫🇷 Français',
      'it': '🇮🇹 Italiano',
      'pt': '🇵🇹 Português',
      'nl': '🇳🇱 Nederlands'
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
      {/* --------CARRUSEL DE IMÁGENES EN TODAS LAS PÁGINAS-------- */}
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

      {/* --------BARRA DE NAVEGACIÓN SOBRE LAS IMÁGENES-------- */}
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

        {/* Acciones del header - LOGIN PRIMERO, IDIOMA SEGUNDO */}
        <div className="header-actions">
          {/* Login PRIMERO (izquierda) */}
          <button 
            className="login-btn"
            onClick={onLoginClick}
            aria-label="Iniciar sesión"
          >
            Iniciar Sesión
          </button>
          
          {/* Idioma SEGUNDO (derecha) con TODAS las banderas */}
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
    </header>
  );
};

export default Header;