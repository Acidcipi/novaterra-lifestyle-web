//===============================================
//🛡️ COMPONENTE DE RUTA PROTEGIDA
//===============================================
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Componente para proteger rutas que requieren autenticación
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        color: 'var(--primary-gold)',
        fontSize: '1.2rem'
      }}>
        ⏳ Verificando acceso...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
