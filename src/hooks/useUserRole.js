//===============================================
//🔐 HOOK DE ROLES DE USUARIO
//===============================================
import { useState, useEffect } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './useAuth';

/**
 * Hook para obtener y monitorear el rol del usuario actual
 * @returns {Object} { role, isUser, isAdmin, isOwner, loading, error }
 */
export function useUserRole() {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }

    // Escuchar cambios en tiempo real del rol del usuario
    const userDocRef = doc(db, 'users', user.uid);
    
    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setRole(userData.role || 'user'); // Por defecto 'user'
        } else {
          // Si no existe el documento, crear uno con rol 'user'
          setRole('user');
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error obteniendo rol:', err);
        setError(err.message);
        setRole('user'); // Rol por defecto en caso de error
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return {
    role,
    isUser: role === 'user',
    isAdmin: role === 'admin',
    isOwner: role === 'owner',
    loading,
    error
  };
}
