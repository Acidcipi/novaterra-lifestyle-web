//===============================================
//🏠 APP COMPLETO CON MODAL Y RUTAS SEPARADAS
//===============================================
import React, { useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n/config';
import { useAuth } from './hooks/useAuth';
import { useUserRole } from './hooks/useUserRole';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config/firebase';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserSettings from './components/UserSettings';
import PropertyDetail from './components/PropertyDetail';

// Páginas
import Home from './pages/Home';
import Properties from './pages/Properties';
import Services from './pages/Services';
import Experiences from './pages/Experiences';
import Contact from './pages/Contact';
import PropertiesPreview from './pages/PropertiesPreview';
import ServicesPreview from './pages/ServicesPreview';
import ExperiencesPreview from './pages/ExperiencesPreview';
import PremiumServices from './pages/PremiumServices';

import './App.css';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-screen">Cargando...</div>;
  }
  
  return user ? children : <Navigate to="/" />;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const { isAdmin, isOwner } = useUserRole();
  
  if (loading) {
    return <div className="loading-screen">Cargando...</div>;
  }
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  if (!isAdmin && !isOwner) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
}

function App() {
  const { t } = useTranslation(['common']);
  const { user, loading } = useAuth();
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMode, setLoginMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = useCallback(() => {
    setShowLoginModal(true);
    setLoginMode('login');
    setError('');
  }, []);

  const handleRegisterClick = useCallback(() => {
    setShowLoginModal(true);
    setLoginMode('register');
    setError('');
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowLoginModal(false);
    setEmail('');
    setPassword('');
    setError('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (loginMode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      handleCloseModal();
    } catch (error) {
      setError(
        loginMode === 'login'
          ? 'Email o contraseña incorrectos'
          : 'Error al crear la cuenta. El email puede estar en uso.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-screen">Cargando...</div>;
  }

  return (
    <div className="App">
      <Header 
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        isAuthenticated={!!user}
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home onRegisterClick={handleRegisterClick} />} />
          <Route path="/properties" element={<Properties onRegisterClick={handleRegisterClick} />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/premium-services" element={<PremiumServices />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/properties-preview" element={<PropertiesPreview />} />
          <Route path="/services-preview" element={<ServicesPreview />} />
          <Route path="/experiences-preview" element={<ExperiencesPreview />} />
          
          {/* Panel usuario normal */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Configuración */}
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <UserSettings />
              </ProtectedRoute>
            } 
          />
          
          {/* Panel admin */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      <Footer />

      {/* MODAL DE LOGIN/REGISTRO */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>✕</button>
            
            <h2 className="modal-title">
              {loginMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="tu@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Mínimo 8 caracteres"
                  minLength="8"
                />
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? 'Procesando...' : (loginMode === 'login' ? 'Entrar' : 'Registrarse')}
              </button>
            </form>

            <div className="modal-footer">
              {loginMode === 'login' ? (
                <p>
                  ¿No tienes cuenta?{' '}
                  <button onClick={() => setLoginMode('register')} className="link-btn">
                    Regístrate aquí
                  </button>
                </p>
              ) : (
                <p>
                  ¿Ya tienes cuenta?{' '}
                  <button onClick={() => setLoginMode('login')} className="link-btn">
                    Inicia sesión aquí
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
