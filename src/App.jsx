//===============================================
//🏠 APP CON AUTENTICACIÓN FIREBASE COMPLETA
//===============================================
import React, { useState, useCallback, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Importar el hook de autenticación
import { useAuth } from './hooks/useAuth';

// Importar componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard'; // NUEVO: Panel principal para usuarios logueados

// Importar páginas públicas
import Home from './pages/Home';
import Properties from './pages/Properties';
import Experiences from './pages/Experiences';
import Services from './pages/Services';
import PremiumServices from './pages/PremiumServices';
import Contact from './pages/Contact';

import './App.css';

//===============================================
//🗗️ COMPONENTE PRINCIPAL CON AUTENTICACIÓN
//===============================================
const App = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { user, login, register, logout, loading, error, clearError, isAuthenticated } = useAuth();
  
  //===============================================
  //📊 ESTADOS DEL MODAL
  //===============================================
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  //===============================================
  //🔧 EFECTOS DE INICIALIZACIÓN - SIN SCROLL AUTOMÁTICO
  //===============================================
  React.useEffect(() => {
    // Comentado para mantener posición del scroll
    // window.scrollTo(0, 0);
  }, [location]);

  //===============================================
  //✅ FUNCIONES DE VALIDACIÓN MEJORADAS
  //===============================================
  const validateEmail = useCallback((email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email.trim());
  }, []);

  const validatePassword = useCallback((password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }, []);

  const sanitizeInput = useCallback((input) => {
    return input.trim().replace(/[<>]/g, '');
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = t('auth.errors.emailRequired');
    } else if (!validateEmail(formData.email)) {
      errors.email = t('auth.errors.emailInvalid');
    }
    
    if (!formData.password) {
      errors.password = t('auth.errors.passwordRequired');
    } else if (!validatePassword(formData.password)) {
      errors.password = t('auth.errors.passwordWeak');
    }
    
    if (isRegisterMode) {
      if (!formData.displayName.trim()) {
        errors.displayName = 'El nombre es obligatorio';
      }
      
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
    setFormData({ email: '', password: '', confirmPassword: '', displayName: '' });
    setFormErrors({});
    clearError();
    document.body.style.overflow = 'hidden';
  }, [clearError]);

  const closeModal = useCallback(() => {
    setIsLoginModalOpen(false);
    setFormData({ email: '', password: '', confirmPassword: '', displayName: '' });
    setFormErrors({});
    setIsSubmitting(false);
    clearError();
    document.body.style.overflow = 'unset';
  }, [clearError]);

  const switchToRegister = useCallback(() => {
    setIsRegisterMode(true);
    setFormErrors({});
    clearError();
    setFormData(prev => ({ ...prev, confirmPassword: '', displayName: '' }));
  }, [clearError]);

  const switchToLogin = useCallback(() => {
    setIsRegisterMode(false);
    setFormErrors({});
    clearError();
    setFormData(prev => ({ ...prev, confirmPassword: '', displayName: '' }));
  }, [clearError]);

  //===============================================
  //📝 MANEJADORES DE FORMULARIO CON FIREBASE
  //===============================================
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    clearError();
  }, [formErrors, sanitizeInput, clearError]);

  const handleFormSubmit = useCallback(async (event) => {
    event.preventDefault();
    
    if (!validateForm() || isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let result;
      
      if (isRegisterMode) {
        result = await register(formData.email, formData.password, formData.displayName);
      } else {
        result = await login(formData.email, formData.password);
      }
      
      if (result.success) {
        closeModal();
        console.log(`✅ ${isRegisterMode ? 'Registro' : 'Login'} exitoso:`, result.message);
      } else {
        setFormErrors({
          submit: result.error
        });
      }
      
    } catch (error) {
      console.error('❌ Error inesperado:', error);
      setFormErrors({
        submit: 'Error inesperado. Inténtalo de nuevo.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isRegisterMode, validateForm, isSubmitting, register, login, closeModal]);

  //===============================================
  //🚪 MANEJADOR DE LOGOUT
  //===============================================
  const handleLogout = useCallback(async () => {
    const result = await logout();
    if (result.success) {
      console.log('✅ Logout exitoso');
    }
  }, [logout]);

  //===============================================
  //🎨 CONTENIDO DEL MODAL DE AUTENTICACIÓN
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
            disabled={isSubmitting}
          >
            ✕
          </button>
          
          <h2 className="modal-title">
            {isRegisterMode ? t('auth.registerTitle') : t('auth.loginTitle')}
          </h2>
          
          <form className="auth-form" onSubmit={handleFormSubmit} noValidate>
            {isRegisterMode && (
              <div className="form-group">
                <label htmlFor="displayName">Nombre completo</label>
                <input 
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  maxLength="50"
                  autoComplete="name"
                  aria-describedby={formErrors.displayName ? "displayName-error" : undefined}
                />
                {formErrors.displayName && (
                  <span id="displayName-error" className="form-error" role="alert">
                    {formErrors.displayName}
                  </span>
                )}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">{t('auth.email')}</label>
              <input 
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
            
            {(formErrors.submit || error) && (
              <div className="form-error submit-error" role="alert">
                {formErrors.submit || error}
              </div>
            )}
            
            <button 
              type="submit" 
              className="auth-submit"
              disabled={isSubmitting || loading}
            >
              {isSubmitting ? (
                <span>Procesando...</span>
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                >
                  Regístrate
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }, [isLoginModalOpen, isRegisterMode, formData, formErrors, isSubmitting, error, loading, t, closeModal, handleFormSubmit, handleInputChange, switchToLogin, switchToRegister]);

  //===============================================
  //🎨 RENDERIZADO PRINCIPAL CON AUTENTICACIÓN
  //===============================================
  
  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="App">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: '#1a1a1a',
          color: '#d4af37',
          fontSize: '1.2rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '1rem', fontSize: '2rem' }}>
              🏠
            </div>
            <div>Cargando Novaterra...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* --------HEADER CON ESTADO DE AUTENTICACIÓN-------- */}
      <Header 
        onLoginClick={openLoginModal} 
        user={user}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
      />
      
      {/* --------SISTEMA DE RUTAS CON PROTECCIÓN-------- */}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/propiedades" element={<Properties />} />
        <Route path="/experiencias" element={<Experiences />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/servicios-premium" element={<PremiumServices />} />
        <Route path="/contacto" element={<Contact />} />
        
        {/* Ruta protegida para usuarios logueados */}
        {isAuthenticated && (
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        )}
        
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

      {/* --------FOOTER-------- */}
      <Footer />
      
      {/* --------MODAL DE AUTENTICACIÓN-------- */}
      {modalContent}
    </div>
  );
};

export default App;