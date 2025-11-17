import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth, firestore } from "./firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"
import type { User } from "./types"

/**
 * Verifica si un usuario tiene permisos de administrador
 * @param user Usuario a verificar
 * @returns true si el usuario es admin o owner
 */
export function isAdmin(user: User | null): boolean {
  return user?.role === "admin" || user?.role === "owner"
}

/**
 * Función para iniciar sesión con email y contraseña
 * @param email Email del usuario
 * @param password Contraseña del usuario
 * @returns Usuario autenticado
 * @throws Error si las credenciales son incorrectas o el usuario no existe
 */
export async function loginWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Verificar que el usuario existe en Firestore
    const userDocRef = doc(firestore, "users", firebaseUser.uid)
    const userDoc = await getDoc(userDocRef)

    if (!userDoc.exists()) {
      throw new Error("Usuario no encontrado en la base de datos")
    }

    return userCredential.user
  } catch (error: any) {
    // Personalizar mensajes de error
    if (error.code === "auth/user-not-found" || error.code === "auth/invalid-credential") {
      throw new Error("Usuario no encontrado o credenciales incorrectas")
    } else if (error.code === "auth/wrong-password") {
      throw new Error("Contraseña incorrecta")
    } else if (error.code === "auth/invalid-email") {
      throw new Error("Email inválido")
    } else if (error.code === "auth/user-disabled") {
      throw new Error("Usuario deshabilitado")
    } else if (error.code === "auth/too-many-requests") {
      throw new Error("Demasiados intentos. Por favor, intenta más tarde")
    }
    throw new Error(error.message || "Error al iniciar sesión")
  }
}

/**
 * Función para registrar un nuevo usuario
 * @param email Email del usuario
 * @param password Contraseña del usuario
 * @param name Nombre del usuario
 * @param dni DNI del usuario
 * @returns Usuario registrado
 * @throws Error si el usuario ya existe o los datos son inválidos
 */
export async function registerWithEmail(email: string, password: string, name: string, dni: string) {
  try {
    // Crear usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Crear datos del usuario en Firestore
    const userData: Omit<User, "id"> = {
      email,
      name,
      dni,
      role: "user", // Por defecto, todos los usuarios nuevos son "user"
      visitedProperties: [],
      favoriteProperties: [],
      createdAt: new Date().toISOString(),
    }

    const userDocRef = doc(firestore, "users", firebaseUser.uid)
    await setDoc(userDocRef, userData)

    return userCredential.user
  } catch (error: any) {
    // Personalizar mensajes de error
    if (error.code === "auth/email-already-in-use") {
      throw new Error("El email ya está registrado")
    } else if (error.code === "auth/invalid-email") {
      throw new Error("Email inválido")
    } else if (error.code === "auth/weak-password") {
      throw new Error("La contraseña debe tener al menos 6 caracteres")
    }
    throw new Error(error.message || "Error al registrarse")
  }
}
