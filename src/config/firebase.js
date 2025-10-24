//===============================================
//🔥 CONFIGURACIÓN FIREBASE - src/config/firebase.js
//===============================================

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';

// ✅ AÑADIMOS FIRESTORE
import { getFirestore } from 'firebase/firestore';

// ✅ AÑADIMOS STORAGE (por si acaso lo necesitas)
import { getStorage } from 'firebase/storage';

//===============================================
//⚙️ CONFIGURACIÓN
//===============================================

const firebaseConfig = {
  apiKey: "AIzaSyCn0nFz0vYgixbS_bGdPs8l33car5MHJcA",
  authDomain: "novaterra-lifestyle.firebaseapp.com",
  projectId: "novaterra-lifestyle",
  storageBucket: "novaterra-lifestyle.firebasestorage.app",
  messagingSenderId: "426435055704",
  appId: "1:426435055704:web:f56b36f2d9c33435b1fa2d",
  measurementId: "G-3MWEKMJP0G"
};

//===============================================
//🔧 INICIALIZACIÓN
//===============================================

const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);  // ✅ ESTO FALTABA
export const storage = getStorage(app);  // ✅ AÑADIDO POR SI ACASO

//===============================================
//🛡️ SERVICIOS DE AUTENTICACIÓN SEGUROS
//===============================================

// Registro de usuario
export const registerUser = async (email, password, displayName) => {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (displayName) {
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
    }

    return {
      success: true,
      user: userCredential.user,
      message: 'Usuario registrado exitosamente'
    };
  } catch (error) {
    console.error('Error en registro:', error);
    let errorMessage = 'Error desconocido';
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Este email ya está registrado';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Email inválido';
        break;
      case 'auth/weak-password':
        errorMessage = 'La contraseña es muy débil';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Error de conexión. Verifica tu internet';
        break;
      default:
        errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage
    };
  }
};

// Login de usuario
export const loginUser = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: userCredential.user,
      message: 'Login exitoso'
    };
  } catch (error) {
    console.error('Error en login:', error);
    let errorMessage = 'Error desconocido';
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'Usuario no encontrado';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Contraseña incorrecta';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Email inválido';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Demasiados intentos. Espera un momento';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Error de conexión';
        break;
      default:
        errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage
    };
  }
};

// Cerrar sesión
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return {
      success: true,
      message: 'Sesión cerrada exitosamente'
    };
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return {
      success: false,
      error: 'Error al cerrar sesión'
    };
  }
};

// Recuperar contraseña
export const resetPassword = async (email) => {
  try {
    if (!email) {
      throw new Error('Email is required');
    }

    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Email de recuperación enviado'
    };
  } catch (error) {
    console.error('Error en recuperación:', error);
    let errorMessage = 'Error desconocido';
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'Usuario no encontrado';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Email inválido';
        break;
      default:
        errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage
    };
  }
};

// Monitor de estado de autenticación
export const monitorAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

//===============================================
//📊 UTILIDADES
//===============================================

// Obtener usuario actual
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Verificar si está logueado
export const isAuthenticated = () => {
  return !!auth.currentUser;
};

// Obtener token del usuario (para APIs)
export const getUserToken = async () => {
  if (auth.currentUser) {
    return await auth.currentUser.getIdToken();
  }
  return null;
};
