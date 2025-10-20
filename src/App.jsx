//===============================================
//🏠 APP CON AUTENTICACIÓN FIREBASE + SISTEMA MODULAR DE TRADUCCIONES
//===============================================
import React, { useState, useCallback, useMemo } from 'react';
import { Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Importar configuración i18n MODULAR
import './i18n/config';

// Importar el hook de autenticación
import { useAuth } from './hooks/useAuth';

// Importar componentes base
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import PropertyDetail from './components/PropertyDetail';

// Importar páginas públicas
import Home from './pages/Home';
import Properties from './pages/Properties';
import Experiences from './pages/Experiences';
import Services from './pages/Services';
import PremiumServices from './pages/PremiumServices';
import Contact from './pages/Contact';

// Importar páginas PREVIEW (para usuarios no logueados)
import PropertiesPreview from './pages/PropertiesPreview';
import ExperiencesPreview from './pages/ExperiencesPreview';
import ServicesPreview from './pages/ServicesPreview';

import './App.css';

//===============================================
//🛡️ COMPONENTE PARA RUTAS PROTEGIDAS
//===============================================
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        color: '#d4af37'
      }}>
        Cargando...
      </div>
    );
  }
  
  return user ? children : <Navigate to="/" replace />;
}

//===============================================
//🏠 COMPONENTE PARA RUTAS DINÁMICAS DE PROPIEDADES
//===============================================
function PropertyDetailRouter() {
  const { propertyId } = useParams();
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to={`/preview/${propertyId}`} replace />;
  }
  
  return <PropertyDetail propertyId={propertyId} category="services" />;
}

//===============================================
//🔒 COMPONENTE PARA VISTAS PREVIEW DE PROPIEDADES
//===============================================
function PropertyPreviewRouter() {
  const { propertyId } = useParams();
  
  return (
    <div className="preview-container">
      <div className="preview-header" style={{
        background: '#1a1a1a',
        color: '#d4af37',
        padding: '2rem',
        textAlign: 'center',
        borderBottom: '2px solid #d4af37'
      }}>
        <h1>🔒 Vista Previa</h1>
        <p>Regístrate para ver información completa de esta propiedad</p>
        <button 
          className="preview-button"
          style={{
            background: 'linear-gradient(135deg, #ff6b35, #ff8c42)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Registrarse Gratis
        </button>
      </div>
      <PropertyDetail 
        propertyId={propertyId} 
        category="services" 
        isPreview={true} 
      />
    </div>
  );
}

//===============================================
//🗂️ COMPONENTE PRINCIPAL CON AUTENTICACIÓN
//===============================================
const App = () => {
  const { t, i18n } = useTranslation('common');
  const location = useLocation();
  const { user, login, register, logout, loading, error, clearError, isAuthenticated } = useAuth();
  
  //===============================================
  //📊 ESTADOS DEL MODAL MEJORADOS
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
  
  // NUEVOS ESTADOS PARA MOSTRAR CONTRASEÑAS
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //===============================================
  //🔧 EFECTOS DE INICIALIZACIÓN
  //===============================================
  React.useEffect(() => {
    // Mantener posición del scroll
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
      errors.email = 'Email requerido';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      errors.password = 'Contraseña requerida';
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
    }
    
    if (isRegisterMode) {
      if (!formData.displayName.trim()) {
        errors.displayName = 'El nombre es obligatorio';
      }
      
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Confirmar contraseña es requerido';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, isRegisterMode, validateEmail, validatePassword]);

  //===============================================
  //🎛️ MANEJADORES DE MODAL MEJORADOS
  //===============================================
  const openLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
    setIsRegisterMode(false);
    // NO limpiar formData para mantener datos en caso de error
    setFormErrors({});
    clearError();
    setShowPassword(false);
    setShowConfirmPassword(false);
    document.body.style.overflow = 'hidden';
  }, [clearError]);

  const closeModal = useCallback(() => {
    setIsLoginModalOpen(false);
    // SOLO limpiar datos si el modal se cierra exitosamente
    setFormData({ email: '', password: '', confirmPassword: '', displayName: '' });
    setFormErrors({});
    setIsSubmitting(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    clearError();
    document.body.style.overflow = 'unset';
  }, [clearError]);

  const switchToRegister = useCallback(() => {
    setIsRegisterMode(true);
    setFormErrors({});
    clearError();
    // MANTENER email y password, solo agregar campos faltantes
    setFormData(prev => ({ 
      ...prev, 
      confirmPassword: prev.password, // Pre-llenar confirmación
      displayName: prev.displayName || ''
    }));
  }, [clearError]);

  const switchToLogin = useCallback(() => {
    setIsRegisterMode(false);
    setFormErrors({});
    clearError();
    // MANTENER email y password
  }, [clearError]);

  //===============================================
  //🔐 MANEJADORES DE FORMULARIO MEJORADOS
  //===============================================
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Limpiar error específico del campo
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
        closeModal(); // Solo cerrar si es exitoso
        console.log(`✅ ${isRegisterMode ? 'Registro' : 'Login'} exitoso`);
      } else {
        setFormErrors({
          submit: result.error
        });
        // NO cerrar modal, mantener datos
      }
      
    } catch (error) {
      console.error('❌ Error inesperado:', error);
      setFormErrors({
        submit: 'Error inesperado. Inténtalo de nuevo.'
      });
      // NO cerrar modal, mantener datos
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
  //🎨 CONTENIDO DEL MODAL MEJORADO CON OJITOS
  //===============================================
  const modalContent = useMemo(() => {
    if (!isLoginModalOpen) return null;

    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button 
            className="modal-close" 
            onClick={closeModal}
            aria-label="Cerrar"
            disabled={isSubmitting}
          >
            ✕
          </button>
          
          <h2 className="modal-title">
            {isRegisterMode ? 'Registro' : 'Iniciar Sesión'}
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
                />
                {formErrors.displayName && (
                  <span className="form-error">{formErrors.displayName}</span>
                )}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
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
              />
              {formErrors.email && (
                <span className="form-error">{formErrors.email}</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  minLength="8"
                  maxLength="128"
                  autoComplete={isRegisterMode ? "new-password" : "current-password"}
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#d4af37',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                  disabled={isSubmitting}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {formErrors.password && (
                <span className="form-error">{formErrors.password}</span>
              )}
            </div>
            
            {isRegisterMode && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    minLength="8"
                    maxLength="128"
                    autoComplete="new-password"
                    style={{ paddingRight: '40px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#d4af37',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                    disabled={isSubmitting}
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {formErrors.confirmPassword && (
                  <span className="form-error">{formErrors.confirmPassword}</span>
                )}
              </div>
            )}
            
            {(formErrors.submit || error) && (
              <div className="form-error submit-error">
                {formErrors.submit || error}
              </div>
            )}
            
            <button 
              type="submit" 
              className="auth-submit"
              disabled={isSubmitting || loading}
            >
              {isSubmitting ? 'Procesando...' : (isRegisterMode ? 'Registrarse' : 'Iniciar Sesión')}
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
  }, [isLoginModalOpen, isRegisterMode, formData, formErrors, isSubmitting, error, loading, showPassword, showConfirmPassword, closeModal, handleFormSubmit, handleInputChange, switchToLogin, switchToRegister]);

  //===============================================
  //🎨 RENDERIZADO PRINCIPAL
  //===============================================
  
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
      
      {/* --------SISTEMA DE RUTAS CON PROTECCIÓN Y PREVIEW-------- */}
      <Routes>
        {/* ========= RUTAS PÚBLICAS SIEMPRE DISPONIBLES ========= */}
        <Route path="/" element={<Home />} />
        
        {/* ========= RUTAS PREVIEW - Solo para usuarios NO logueados ========= */}
        {!isAuthenticated && (
          <>
            <Route 
              path="/propiedades-preview" 
              element={<PropertiesPreview onLoginClick={openLoginModal} />} 
            />
            <Route 
              path="/experiencias-preview" 
              element={<ExperiencesPreview onLoginClick={openLoginModal} />} 
            />
            <Route 
              path="/servicios-preview" 
              element={<ServicesPreview onLoginClick={openLoginModal} />} 
            />
          </>
        )}
        
        {/* ========= RUTAS COMPLETAS - Solo para usuarios logueados ========= */}
        {isAuthenticated && (
          <>
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard user={user} />
                </ProtectedRoute>
              } 
            />
            <Route path="/propiedades" element={<Properties />} />
            <Route path="/experiencias" element={<Experiences />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/servicios-premium" element={<PremiumServices />} />
            
            {/* Redirecciones desde preview a rutas completas si está logueado */}
            <Route path="/propiedades-preview" element={<Properties />} />
            <Route path="/experiencias-preview" element={<Experiences />} />
            <Route path="/servicios-preview" element={<PremiumServices />} />
          </>
        )}

        {/* ========= RUTAS DE PROPIEDADES ESPECÍFICAS ========= */}
        <Route 
          path="/property/villa-lujo-santander" 
          element={
            isAuthenticated ? 
              <PropertyDetail propertyId="villa_lujo_santander" category="services" /> :
              <Navigate to="/preview/villa-lujo-santander" replace />
          } 
        />

        <Route 
          path="/property/apartamento-centro-santander" 
          element={
            isAuthenticated ? 
              <PropertyDetail propertyId="apartamento_centro_santander" category="services" /> :
              <Navigate to="/preview/apartamento-centro-santander" replace />
          } 
        />

        <Route path="/property/:propertyId" element={<PropertyDetailRouter />} />

        {/* ========= RUTAS DE PREVIEW PARA PROPIEDADES ESPECÍFICAS ========= */}
        <Route path="/preview/villa-lujo-santander" element={<PropertyPreviewRouter />} />
        <Route path="/preview/apartamento-centro-santander" element={<PropertyPreviewRouter />} />
        <Route path="/preview/:propertyId" element={<PropertyPreviewRouter />} />

        {/* ========= PÁGINAS LEGALES ========= */}
        <Route 
          path="/privacy" 
          element={
            <main className="page-container">
              <section className="content-section active">
                <h1 className="page-title">Política de Privacidad</h1>
                <p className="page-description">Información sobre el tratamiento de datos personales.</p>
              </section>
            </main>
          } 
        />
        <Route 
          path="/terms" 
          element={
            <main className="page-container">
              <section className="content-section active">
                <h1 className="page-title">Términos y Condiciones</h1>
                <p className="page-description">Condiciones de uso de la plataforma.</p>
              </section>
            </main>
          } 
        />
        
        {/* ========= RUTA 404 ========= */}
        <Route 
          path="*" 
          element={
            <main className="page-container">
              <section className="content-section active">
                <h1 className="page-title">Página no encontrada</h1>
                <p className="page-description">
                  La página que buscas no existe. 
                  <br />
                  <a href="/" style={{ color: '#d4af37', textDecoration: 'underline' }}>
                    Volver al inicio
                  </a>
                </p>
              </section>
            </main>
          } 
        />
      </Routes>

      {/* --------FOOTER CON TRADUCCIONES MODULARES-------- */}
      <Footer />
      
      {/* --------MODAL DE AUTENTICACIÓN MEJORADO-------- */}
      {modalContent}
    </div>
  );
};

export default App;