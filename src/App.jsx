//===============================================
//🏠 APP CON SISTEMA DE ROUTING COMPLETO Y CORREGIDO
//===============================================
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Importar componentes
import Header from './components/Header';
import Footer from './components/Footer';
import { SUPPORTED_LANGUAGES } from './i18n/config';

// Importar páginas
import Home from './pages/Home';
import Properties from './pages/Properties';
import Experiences from './pages/Experiences';
import Services from './pages/Services';
import PremiumServices from './pages/PremiumServices'; // NUEVO: Servicios Premium
import Contact from './pages/Contact';

import './App.css';

//===============================================
//🗗️ COMPONENTE PRINCIPAL CON ROUTING CORREGIDO
//===============================================
const App = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  
  //===============================================
  //📊 ESTADOS DEL COMPONENTE
  //===============================================
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //===============================================
  //🔧 EFECTOS DE INICIALIZACIÓN
  //===============================================
  // Cargar idioma guardado
  useEffect(() => {
    const savedLanguage = localStorage.getItem('novaterra-language');
    if (savedLanguage && 
        SUPPORTED_LANGUAGES.includes(savedLanguage) && 
        i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  // Scroll to top en cambio de página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  //===============================================
  //✅ FUNCIONES DE VALIDACIÓN CON SEGURIDAD MEJORADA
  //===============================================
  const validateEmail = useCallback((email) => {
    // Regex más estricta para validación de email
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email.trim());
  }, []);

  const validatePassword = useCallback((password) => {
    // Validación más robusta: mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }, []);

  const sanitizeInput = useCallback((input) => {
    // Limpiar input de caracteres potencialmente peligrosos
    return input.trim().replace(/[<>]/g, '');
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    
    // Validar email
    if (!formData.email) {
      errors.email = t('auth.errors.emailRequired');
    } else if (!validateEmail(formData.email)) {
      errors.email = t('auth.errors.emailInvalid');
    }
    
    // Validar contraseña
    if (!formData.password) {
      errors.password = t('auth.errors.passwordRequired');
    } else if (!validatePassword(formData.password)) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
    }
    
    // Validar confirmación de contraseña en registro
    if (isRegisterMode) {
      if (!formData.confirmPassword) {
        errors.confirmPassword = t('auth.errors.confirmPasswordRequired');
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = t('auth.errors.passwordMismatch');
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, isRegisterMode, t, validateEmail, validatePassword]);

  //===============================================
  //🎛️ MANEJADORES DE MODAL
  //===============================================
  const openLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
    setIsRegisterMode(false);
    setFormData({ email: '', password: '', confirmPassword: '' });
    setFormErrors({});
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsLoginModalOpen(false);
    setFormData({ email: '', password: '', confirmPassword: '' });
    setFormErrors({});
    setIsLoading(false);
    // Restaurar scroll del body
    document.body.style.overflow = 'unset';
  }, []);

  const switchToRegister = useCallback(() => {
    setIsRegisterMode(true);
    setFormErrors({});
    setFormData(prev => ({ ...prev, confirmPassword: '' }));
  }, []);

  const switchToLogin = useCallback(() => {
    setIsRegisterMode(false);
    setFormErrors({});
    setFormData(prev => ({ ...prev, confirmPassword: '' }));
  }, []);

  //===============================================
  //📝 MANEJADORES DE FORMULARIO CON SEGURIDAD
  //===============================================
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Limpiar errores del campo cuando el usuario empiece a escribir
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [formErrors, sanitizeInput]);

  const handleFormSubmit = useCallback(async (event) => {
    event.preventDefault();
    
    if (!validateForm() || isLoading) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simular llamada a API con timeout más realista
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí irían las llamadas reales a tu API
      console.log('✅ Formulario enviado de forma segura:', {
        email: formData.email,
        mode: isRegisterMode ? 'register' : 'login',
        timestamp: new Date().toISOString()
      });
      
      // Simular éxito y cerrar modal
      closeModal();
      
      // Mostrar mensaje de éxito (opcional)
      // Podrías agregar un sistema de notificaciones aquí
      
    } catch (error) {
      console.error('❌ Error de autenticación:', error);
      setFormErrors({
        submit: t('auth.errors.submitError')
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData, isRegisterMode, validateForm, isLoading, closeModal, t]);

  //===============================================
  //🎨 CONTENIDO DEL MODAL CON SEGURIDAD MEJORADA
  //===============================================
  const modalContent = useMemo(() => {
    if (!isLoginModalOpen) return null;

    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button 
            className="modal-close" 
            onClick={closeModal}
            aria-label={t('common.close')}
            disabled={isLoading}
          >
            ✕
          </button>
          
          <h2 className="modal-title">
            {isRegisterMode ? t('auth.registerTitle') : t('auth.loginTitle')}
          </h2>
          
          <form className="auth-form" onSubmit={handleFormSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email">{t('auth.email')}</label>
              <input 
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                maxLength="254"
                autoComplete="email"
                aria-describedby={formErrors.email ? "email-error" : undefined}
              />
              {formErrors.email && (
                <span id="email-error" className="form-error" role="alert">
                  {formErrors.email}
                </span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">{t('auth.password')}</label>
              <input 
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                minLength="8"
                maxLength="128"
                autoComplete={isRegisterMode ? "new-password" : "current-password"}
                aria-describedby={formErrors.password ? "password-error" : undefined}
              />
              {formErrors.password && (
                <span id="password-error" className="form-error" role="alert">
                  {formErrors.password}
                </span>
              )}
            </div>
            
            {isRegisterMode && (
              <div className="form-group">
                <label htmlFor="confirmPassword">{t('auth.confirmPassword')}</label>
                <input 
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  minLength="8"
                  maxLength="128"
                  autoComplete="new-password"
                  aria-describedby={formErrors.confirmPassword ? "confirm-password-error" : undefined}
                />
                {formErrors.confirmPassword && (
                  <span id="confirm-password-error" className="form-error" role="alert">
                    {formErrors.confirmPassword}
                  </span>
                )}
              </div>
            )}
            
            {formErrors.submit && (
              <div className="form-error submit-error" role="alert">
                {formErrors.submit}
              </div>
            )}
            
            <button 
              type="submit" 
              className="auth-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>{t('common.loading')}</span>
              ) : (
                isRegisterMode ? t('auth.registerButton') : t('auth.loginButton')
              )}
            </button>
          </form>
          
          <div className="auth-switch">
            {isRegisterMode ? (
              <span>
                ¿Ya tienes cuenta?{' '}
                <button 
                  className="link-button" 
                  onClick={switchToLogin}
                  disabled={isLoading}
                >
                  Inicia Sesión
                </button>
              </span>
            ) : (
              <span>
                ¿No tienes cuenta?{' '}
                <button 
                  className="link-button" 
                  onClick={switchToRegister}
                  disabled={isLoading}
                >
                  Regístrate
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }, [isLoginModalOpen, isRegisterMode, formData, formErrors, isLoading, t, closeModal, handleFormSubmit, handleInputChange, switchToLogin, switchToRegister]);

  //===============================================
  //🎨 RENDERIZADO PRINCIPAL CON RUTAS CORREGIDAS
  //===============================================
  return (
    <div className="App">
      {/* --------HEADER GLOBAL-------- */}
      <Header onLoginClick={openLoginModal} />
      
      {/* --------SISTEMA DE RUTAS CORREGIDO-------- */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propiedades" element={<Properties />} />
        <Route path="/experiencias" element={<Experiences />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/servicios-premium" element={<PremiumServices />} /> {/* NUEVA RUTA */}
        <Route path="/contacto" element={<Contact />} />
        
        {/* Ruta 404 */}
        <Route path="*" element={
          <main className="page-container">
            <section className="content-section active">
              <h1 className="page-title">Página no encontrada</h1>
              <p className="page-description">
                La página que buscas no existe. 
                <br />
                <a href="/" style={{color: '#d4af37', textDecoration: 'underline'}}>
                  Volver al inicio
                </a>
              </p>
            </section>
          </main>
        } />
      </Routes>

      {/* --------FOOTER REORGANIZADO-------- */}
      <Footer />
      
      {/* --------MODAL LOGIN/REGISTRO CORREGIDO-------- */}
      {modalContent}
    </div>
  );
};

export default App;