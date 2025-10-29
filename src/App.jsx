//===============================================
//🏠 APP CON RUTAS PROTEGIDAS Y ROLES
//===============================================
import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n/config';

// Hooks
import { useAuth } from './hooks/useAuth';

// Componentes de autenticación
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

// Componentes generales
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

// Páginas públicas
import Home from './pages/Home';
import Properties from './pages/Properties';
import Services from './pages/Services';
import Experiences from './pages/Experiences';
import Contact from './pages/Contact';
import PropertiesPreview from './pages/PropertiesPreview';
import ServicesPreview from './pages/ServicesPreview';
import ExperiencesPreview from './pages/ExperiencesPreview';
import PremiumServices from './pages/PremiumServices';

// Páginas de administrador
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProperties from './pages/admin/ManageProperties';

// Estilos
import './App.css';

//===============================================
//🔒 COMPONENTE PRINCIPAL CON RUTAS PROTEGIDAS
//===============================================
function App() {
  const { t, i18n } = useTranslation('common');
  const { user, loading: authLoading } = useAuth();
  
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  //===============================================
  // 🎬 MANEJO DE MODALES
  //===============================================
  const handleLoginClick = useCallback(() => {
    setShowLogin(true);
    setShowRegister(false);
  }, []);

  const handleRegisterClick = useCallback(() => {
    setShowRegister(true);
    setShowLogin(false);
  }, []);

  const handleCloseForms = useCallback(() => {
    setShowLogin(false);
    setShowRegister(false);
  }, []);

  const handleDashboardClick = useCallback(() => {
    setShowDashboard(true);
  }, []);

  const handleCloseDashboard = useCallback(() => {
    setShowDashboard(false);
  }, []);

  //===============================================
  // ⏳ LOADING DE AUTENTICACIÓN
  //===============================================
  if (authLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#1a1a1a',
        color: '#d4af37',
        fontSize: '1.5rem'
      }}>
        <div>⏳ Cargando...</div>
      </div>
    );
  }

  //===============================================
  // 🎨 RENDERIZADO PRINCIPAL
  //===============================================
  return (
    <div className="App">
      <Header 
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        onDashboardClick={handleDashboardClick}
        isAuthenticated={!!user}
      />

      <main className="main-content">
        <Routes>
          {/* ====================================== */}
          {/* RUTAS PÚBLICAS */}
          {/* ====================================== */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Propiedades */}
          <Route path="/properties-preview" element={<PropertiesPreview />} />
          <Route path="/properties" element={<Properties />} />
          
          {/* Servicios */}
          <Route path="/services-preview" element={<ServicesPreview />} />
          <Route path="/services" element={<Services />} />
          <Route path="/premium-services" element={<PremiumServices />} />
          
          {/* Experiencias */}
          <Route path="/experiences-preview" element={<ExperiencesPreview />} />
          <Route path="/experiences" element={<Experiences />} />

          {/* ====================================== */}
          {/* RUTAS PROTEGIDAS (USUARIO NORMAL) */}
          {/* ====================================== */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* ====================================== */}
          {/* RUTAS DE ADMINISTRADOR */}
          {/* ====================================== */}
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/properties" 
            element={
              <AdminRoute>
                <ManageProperties />
              </AdminRoute>
            } 
          />

          {/* Ruta 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {/* Modal Dashboard (si se usa) */}
      {showDashboard && user && (
        <div className="modal-overlay" onClick={handleCloseDashboard}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseDashboard}>×</button>
            <Dashboard onClose={handleCloseDashboard} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
