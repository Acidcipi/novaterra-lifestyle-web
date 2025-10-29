//===============================================
//👨‍💼 RUTA PROTEGIDA PARA ADMINISTRADORES
//===============================================
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useUserRole } from '../../hooks/useUserRole';

/**
 * Componente para proteger rutas solo para admin y owner
 */
export default function AdminRoute({ children }) {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, isOwner, loading: roleLoading } = useUserRole();

  if (authLoading || roleLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        color: 'var(--primary-gold)',
        fontSize: '1.2rem'
      }}>
        ⏳ Verificando permisos...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin && !isOwner) {
    return (
      <div style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        color: 'var(--primary-gold)'
      }}>
        <h2>🚫 Acceso Denegado</h2>
        <p>No tienes permisos para acceder a esta sección.</p>
      </div>
    );
  }

  return children;
}
