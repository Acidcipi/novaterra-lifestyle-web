//===============================================
//🪝 HOOK DE AUTENTICACIÓN - src/hooks/useAuth.js
//===============================================
import { useState, useEffect } from 'react';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  resetPassword, 
  monitorAuthState,
  getCurrentUser 
} from '../config/firebase';

//===============================================
//🔐 HOOK PERSONALIZADO PARA AUTENTICACIÓN
//===============================================
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Monitor del estado de autenticación
  useEffect(() => {
    const unsubscribe = monitorAuthState((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  //===============================================
  //📝 FUNCIÓN DE REGISTRO
  //===============================================
  const register = async (email, password, displayName = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await registerUser(email, password, displayName);
      
      if (!result.success) {
        setError(result.error);
        return result;
      }
      
      return result;
      
    } catch (error) {
      const errorMessage = 'Error inesperado durante el registro';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  //===============================================
  //🚪 FUNCIÓN DE LOGIN
  //===============================================
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await loginUser(email, password);
      
      if (!result.success) {
        setError(result.error);
        return result;
      }
      
      return result;
      
    } catch (error) {
      const errorMessage = 'Error inesperado durante el login';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  //===============================================
  //🚪 FUNCIÓN DE LOGOUT
  //===============================================
  const logout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await logoutUser();
      
      if (!result.success) {
        setError(result.error);
        return result;
      }
      
      return result;
      
    } catch (error) {
      const errorMessage = 'Error al cerrar sesión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  //===============================================
  //🔄 FUNCIÓN DE RESET PASSWORD
  //===============================================
  const resetUserPassword = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await resetPassword(email);
      
      if (!result.success) {
        setError(result.error);
        return result;
      }
      
      return result;
      
    } catch (error) {
      const errorMessage = 'Error al enviar email de recuperación';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  //===============================================
  //🔍 FUNCIONES UTILITARIAS
  //===============================================
  const isAuthenticated = !!user;
  
  const getUserInfo = () => {
    if (!user) return null;
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime
    };
  };

  const clearError = () => {
    setError(null);
  };

  //===============================================
  //📤 RETURN DEL HOOK
  //===============================================
  return {
    // Estado
    user,
    loading,
    error,
    isAuthenticated,
    
    // Funciones de auth
    register,
    login,
    logout,
    resetUserPassword,
    
    // Utilidades
    getUserInfo,
    clearError
  };
};