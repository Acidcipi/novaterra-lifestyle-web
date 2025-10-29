//===============================================
//🌟 HEADER CON DROPDOWN Y ROLES FUNCIONAL
//===============================================
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useUserRole } from '../hooks/useUserRole';

export default function Header({ onLoginClick, onLogout, isAuthenticated }) {
  const { t, i18n } = useTranslation('common');
  const { user, logout } = useAuth();
  const { role, isAdmin, isOwner } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showExperiencesMenu, setShowExperiencesMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const INACTIVITY_TIME = 30 * 60 * 1000;
  const WARNING_TIME = 5 * 60 * 1000;

  const inactivityTimer = useRef(null);
  const warningTimer = useRef(null);
  const countdownInterval = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const userMenuRef = useRef(null);

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'mk', name: 'Македонски', flag: '🇲🇰' }
  ];

  const headerImages = [
    '/images/header/tina-menor.jpg',
    '/images/header/castro.jpg',
    '/images/header/la-magdalena.jpg',
    '/images/header/cabarceno.jpg',
    '/images/header/saltacaballo.jpg'
  ];

  //===============================================
  // 🔐 FUNCIÓN DE LOGOUT
  //===============================================
  const handleLogout = useCallback(async () => {
    try {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (warningTimer.current) clearTimeout(warningTimer.current);
      if (countdownInterval.current) clearInterval(countdownInterval.current);
      setTimeLeft(null);
      setShowUserMenu(false);
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }, [logout, navigate]);

  //===============================================
  // ⏲️ TIMER DE INACTIVIDAD
  //===============================================
  const resetInactivityTimer = useCallback(() => {
    if (!user) return;

    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (warningTimer.current) clearTimeout(warningTimer.current);
    if (countdownInterval.current) clearInterval(countdownInterval.current);
    setTimeLeft(null);

    warningTimer.current = setTimeout(() => {
      setTimeLeft(WARNING_TIME / 1000);
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

    inactivityTimer.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_TIME);
  }, [user, handleLogout]);

  useEffect(() => {
    if (!user) return;

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    const resetTimer = () => resetInactivityTimer();

    events.forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });

    resetInactivityTimer();

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
  // 🎬 CARRUSEL DE IMÁGENES
  //===============================================
  useEffect(() => {
    if (isCarouselPaused) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % headerImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [headerImages.length, isCarouselPaused]);

  //===============================================
  // 🌐 CAMBIAR IDIOMA
  //===============================================
  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setShowLanguageMenu(false);
    localStorage.setItem('novaterra-language', langCode);
  };

  //===============================================
  // 📂 DROPDOWN EXPERIENCIAS
  //===============================================
  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setShowExperiencesMenu(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setShowExperiencesMenu(false);
    }, 300);
  };

  //===============================================
  // 👤 CERRAR MENÚ AL HACER CLIC FUERA
  //===============================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  //===============================================
  // 👑 OBTENER BADGE DE ROL
  //===============================================
  const getRoleBadge = () => {
    if (isOwner) return { icon: '👑', text: 'Owner', class: 'role-owner' };
    if (isAdmin) return { icon: '👨‍💼', text: 'Admin', class: 'role-admin' };
    return { icon: '👤', text: 'User', class: 'role-user' };
  };

  const roleBadge = user ? getRoleBadge() : null;

  //===============================================
  // 🎨 RENDERIZADO
  //===============================================
  return (
    <>
      {timeLeft !== null && (
        <div className="inactivity-warning">
          ⚠️ Sesión expirará en: {formatTime(timeLeft)}
        </div>
      )}

      <div className="header-container">
        <div className="hero-image-container">
          {headerImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Header ${index + 1}`}
              className="hero-image"
              style={{
                opacity: currentImageIndex === index ? 1 : 0,
                transition: 'opacity 1.5s ease-in-out',
                position: currentImageIndex === index ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ))}

          <div className="carousel-indicators">
            {headerImages.map((_, index) => (
              <div
                key={index}
                className={`carousel-indicator ${currentImageIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>

          <button 
            className="carousel-play-pause"
            onClick={() => setIsCarouselPaused(!isCarouselPaused)}
            aria-label={isCarouselPaused ? 'Reproducir' : 'Pausar'}
          >
            {isCarouselPaused ? (
              <div className="play-icon"></div>
            ) : (
              <div className="pause-icon"></div>
            )}
          </button>
        </div>

        <nav className="navigation-bar">
          <div className="logo">
            <Link to="/">
              <h2>Novaterra Lifestyle</h2>
            </Link>
          </div>

          <div className="nav-links">
            <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
              {t('header.nav.home')}
            </Link>
            <Link to="/properties" className={location.pathname === '/properties' ? 'nav-link active' : 'nav-link'}>
              {t('header.nav.properties')}
            </Link>
            <Link to="/services" className={location.pathname === '/services' ? 'nav-link active' : 'nav-link'}>
              {t('header.nav.services')}
            </Link>
            
            <div 
              className={`nav-dropdown ${showExperiencesMenu ? 'active' : ''}`}
              onMouseEnter={handleMouseEnterDropdown}
              onMouseLeave={handleMouseLeaveDropdown}
              ref={dropdownRef}
            >
              <span className="dropdown-trigger">
                {t('header.nav.experiences')} ▾
              </span>
              {showExperiencesMenu && (
                <div className="dropdown-menu">
                  <Link to="/experiences" className="dropdown-item" onClick={() => setShowExperiencesMenu(false)}>
                    🌟 Todas las Experiencias
                  </Link>
                  <Link to="/experiences-preview" className="dropdown-item" onClick={() => setShowExperiencesMenu(false)}>
                    👁️ Vista Previa
                  </Link>
                  <Link to="/premium-services" className="dropdown-item" onClick={() => setShowExperiencesMenu(false)}>
                    💎 Servicios Premium
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="header-actions">
            {user ? (
              <div className="user-dropdown-wrapper" ref={userMenuRef}>
                <div 
                  className="user-info-hover"
                  onMouseEnter={() => setShowUserMenu(true)}
                >
                  <span className="user-welcome">
                    {roleBadge.icon} {user.email}
                    {roleBadge && (
                      <span className={`role-badge ${roleBadge.class}`}>
                        {roleBadge.text}
                      </span>
                    )}
                  </span>
                </div>

                {showUserMenu && (
                  <div 
                    className="user-dropdown-menu"
                    onMouseLeave={() => setShowUserMenu(false)}
                  >
                    {(isAdmin || isOwner) && (
                      <button
                        className="dropdown-user-item"
                        onClick={() => {
                          navigate('/admin/dashboard');
                          setShowUserMenu(false);
                        }}
                      >
                        📊 Panel Admin
                      </button>
                    )}
                    <button
                      className="dropdown-user-item"
                      onClick={() => {
                        navigate('/dashboard');
                        setShowUserMenu(false);
                      }}
                    >
                      🏠 Mi Panel
                    </button>
                    <button
                      className="dropdown-user-item"
                      onClick={() => {
                        navigate('/settings');
                        setShowUserMenu(false);
                      }}
                    >
                      ⚙️ Configuración
                    </button>
                    <div className="dropdown-divider"></div>
                    <button
                      className="dropdown-user-item logout-item"
                      onClick={handleLogout}
                    >
                      🚪 Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={onLoginClick} className="login-btn">
                {t('header.auth.login')}
              </button>
            )}

            <div className="language-selector">
              <button 
                className="language-btn"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              >
                <span className="language-flag">
                  {languages.find(lang => lang.code === i18n.language)?.flag || '🌐'}
                </span>
                <span className="language-name">
                  {languages.find(lang => lang.code === i18n.language)?.name || 'Idioma'}
                </span>
              </button>
              {showLanguageMenu && (
                <div className="language-dropdown">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="language-option"
                    >
                      {lang.flag} {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
