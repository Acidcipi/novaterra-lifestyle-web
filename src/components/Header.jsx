//===============================================
//🌟 HEADER CON LOGOUT Y TIMER DE INACTIVIDAD - src/components/Header.jsx
//===============================================
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';

export default function Header({ onLoginClick, onLogout, isAuthenticated }) {
  //===============================================
  //🔧 CONFIGURACIÓN INICIAL
  //===============================================
  const { t, i18n } = useTranslation('common');
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);

  //===============================================
  //⏰ CONFIGURACIÓN DE TIMEOUT DE INACTIVIDAD
  //===============================================
  const INACTIVITY_TIME = 30 * 60 * 1000; // 30 minutos en millisegundos
  const WARNING_TIME = 5 * 60 * 1000;     // Mostrar warning 5 min antes
  const inactivityTimer = useRef(null);
  const warningTimer = useRef(null);
  const countdownInterval = useRef(null);

  //===============================================
  //🌍 CONFIGURACIÓN DE IDIOMAS
  //===============================================
  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'mk', name: 'Македонски', flag: '🇲🇰' }
  ];

  //===============================================
  //📸 IMÁGENES DEL CARRUSEL
  //===============================================
  const headerImages = [
    '/images/header/tina-menor.jpg',
    '/images/header/castro.jpg',
    '/images/header/la-magdalena.jpg',
    '/images/header/cabarceno.jpg',
    '/images/header/saltacaballo.jpg'
    
  ];

  //===============================================
  //🚪 FUNCIÓN DE LOGOUT SEGURO
  //===============================================
  const handleLogout = useCallback(async () => {
    try {
      // Limpiar todos los timers
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (warningTimer.current) clearTimeout(warningTimer.current);
      if (countdownInterval.current) clearInterval(countdownInterval.current);
      
      setTimeLeft(null);
      
      if (onLogout) {
        await onLogout();
      }
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }, [onLogout, navigate]);

  //===============================================
  //⏰ SISTEMA DE INACTIVIDAD
  //===============================================
  const resetInactivityTimer = useCallback(() => {
    // Solo para usuarios autenticados
    if (!user) return;

    // Limpiar timers existentes
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (warningTimer.current) clearTimeout(warningTimer.current);
    if (countdownInterval.current) clearInterval(countdownInterval.current);
    
    setTimeLeft(null);

    // Timer para mostrar warning
    warningTimer.current = setTimeout(() => {
      setTimeLeft(WARNING_TIME / 1000); // 5 minutos en segundos
      
      // Countdown cada segundo
      countdownInterval.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, INACTIVITY_TIME - WARNING_TIME);

    // Timer final para logout automático
    inactivityTimer.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_TIME);
  }, [user, handleLogout]);

  //===============================================
  //🎧 EVENTOS DE ACTIVIDAD DEL USUARIO
  //===============================================
  useEffect(() => {
    if (!user) return;

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const resetTimer = () => resetInactivityTimer();
    
    // Agregar listeners
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });

    // Inicializar timer
    resetInactivityTimer();

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, true);
      });
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (warningTimer.current) clearTimeout(warningTimer.current);
      if (countdownInterval.current) clearInterval(countdownInterval.current);
    };
  }, [user, resetInactivityTimer]);

  //===============================================
  //⏰ CARRUSEL AUTOMÁTICO
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
  //🌐 CAMBIO DE IDIOMA
  //===============================================
  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setShowLanguageMenu(false);
    localStorage.setItem('novaterra-language', langCode);
  };

  //===============================================
  //🎯 IDIOMA ACTUAL
  //===============================================
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  //===============================================
  //⏰ FORMATEAR TIEMPO RESTANTE
  //===============================================
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="header-container">
      {/* --------WARNING DE INACTIVIDAD-------- */}
      {timeLeft && timeLeft > 0 && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: '#ff6b35',
          color: 'white',
          padding: '1rem',
          textAlign: 'center',
          zIndex: 10000,
          fontWeight: 'bold'
        }}>
          ⚠️ Sesión expirará en {formatTime(timeLeft)}. Haz clic en cualquier lugar para continuar.
        </div>
      )}

      {/* --------CARRUSEL DE FONDO CANTABRIA-------- */}
      <div className="hero-image-container">
        <img 
          src={headerImages[currentImageIndex]} 
          alt="Cantabria Lifestyle" 
          className="hero-image"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        
        {/* --------CONTROLES DEL CARRUSEL-------- */}
        <div className="carousel-indicators">
          {headerImages.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Imagen ${index + 1}`}
            />
          ))}
        </div>

        <button 
          className="carousel-nav carousel-prev"
          onClick={() => setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? headerImages.length - 1 : prevIndex - 1
          )}
          aria-label="Imagen anterior"
        >
          ❮
        </button>
        
        <button 
          className="carousel-nav carousel-next"
          onClick={() => setCurrentImageIndex((prevIndex) => 
            (prevIndex + 1) % headerImages.length
          )}
          aria-label="Siguiente imagen"
        >
          ❯
        </button>
      </div>

      {/* --------BARRA DE NAVEGACIÓN PREMIUM-------- */}
      <nav className="navigation-bar">
        
        {/* --------LOGO NOVATERRA-------- */}
        <div className="logo">
          <Link to="/">
            <h2>Novaterra<span style={{color: '#f4d03f'}}>Lifestyle</span></h2>
          </Link>
        </div>

        {/* --------MENÚ PRINCIPAL (SIN CONTACTO)-------- */}
        <div className="nav-links">
          <Link 
            to="/" 
            className="nav-link"
          >
            {t('header.nav.home')}
          </Link>
          
          <Link 
            to={user ? "/propiedades" : "/propiedades-preview"}
            className="nav-link"
          >
            {t('header.nav.properties')}
          </Link>
          
          <Link 
            to={user ? "/servicios" : "/servicios-preview"}
            className="nav-link"
          >
            {t('header.nav.services')}
          </Link>
          
          <Link 
            to={user ? "/experiencias" : "/experiencias-preview"}
            className="nav-link"
          >
            {t('header.nav.experiences')}
          </Link>

          {/* --------DASHBOARD PREMIUM-------- */}
          {user && (
            <Link 
              to="/dashboard" 
              className="nav-link"
            >
              {t('header.nav.dashboard')}
            </Link>
          )}
        </div>

        {/* --------CONTROLES PREMIUM-------- */}
        <div className="header-actions">
          
          {/* --------SELECTOR DE IDIOMA-------- */}
          <div className="language-selector">
            <select 
              value={i18n.language} 
              onChange={(e) => changeLanguage(e.target.value)}
              className="language-select"
            >
              {languages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.flag} {language.name}
                </option>
              ))}
            </select>
          </div>

          {/* --------BOTONES DE AUTENTICACIÓN MEJORADOS-------- */}
          {user ? (
            <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="user-welcome">
                Hola, {user.displayName || user.email}
              </span>
              <button 
                onClick={handleLogout}
                className="login-btn"
                style={{
                  background: '#ff6b35',
                  color: 'white',
                  border: '1px solid #ff6b35'
                }}
              >
                {t('header.auth.logout')}
              </button>
            </div>
          ) : (
            <button 
              onClick={onLoginClick} 
              className="login-btn"
            >
              {t('header.auth.login')}
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}