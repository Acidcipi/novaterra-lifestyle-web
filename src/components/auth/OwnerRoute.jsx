//===============================================
//👑 RUTA PROTEGIDA SOLO PARA OWNER
//===============================================
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useUserRole } from '../../hooks/useUserRole';

/**
 * Componente para proteger rutas exclusivas del owner
 */
export default function OwnerRoute({ children }) {
  const { user, loading: authLoading } = useAuth();
  const { isOwner, loading: roleLoading } = useUserRole();

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
        ⏳ Verificando permisos de propietario...
      </div>
    );
  }

  if (!user || !isOwner) {
    return (
      <div style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        color: 'var(--primary-gold)'
      }}>
        <h2>🚫 Acceso Restringido</h2>
        <p>Esta sección es exclusiva para el propietario del sistema.</p>
      </div>
    );
  }

  return children;
}
