"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { User, AuthContextType } from "./types"
import { auth, firestore } from "./firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const INACTIVITY_TIMEOUT = 5 * 60 * 1000 // 5 minutos

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastActivity, setLastActivity] = useState(Date.now())

  // Actualizar timestamp de última actividad
  const updateActivity = useCallback(() => {
    setLastActivity(Date.now())
  }, [])

  // Monitorear eventos de usuario para detectar actividad
  useEffect(() => {
    if (typeof window === "undefined") return

    const events = ["mousedown", "keydown", "scroll", "touchstart", "click"]

    events.forEach((event) => {
      window.addEventListener(event, updateActivity)
    })

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, updateActivity)
      })
    }
  }, [updateActivity])

  // Auto-logout por inactividad
  useEffect(() => {
    if (!user) return

    const interval = setInterval(() => {
      const now = Date.now()
      const timeSinceLastActivity = now - lastActivity

      if (timeSinceLastActivity >= INACTIVITY_TIMEOUT) {
        console.log("[v0] Auto-logout por inactividad de 5 minutos")
        logout()
      }
    }, 60000) // Verificar cada minuto

    return () => clearInterval(interval)
  }, [user, lastActivity])

  // Listener de cambios de autenticación
  useEffect(() => {
    if (typeof window === "undefined") return

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        console.log("[v0] Usuario autenticado:", firebaseUser.email)
        
        const userDocRef = doc(firestore, "users", firebaseUser.uid)

        try {
          const userDoc = await getDoc(userDocRef)
          
          if (userDoc.exists()) {
            const userData = userDoc.data()
            console.log("[v0] Datos del usuario obtenidos:", userData)
            console.log("[v0] Rol del usuario:", userData.role)
            
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email || "",
              name: userData.name || "",
              dni: userData.dni || "",
              role: userData.role || "user",
              visitedProperties: userData.visitedProperties || [],
              favoriteProperties: userData.favoriteProperties || [],
              createdAt: userData.createdAt || new Date().toISOString(),
              phone: userData.phone,
            })
          } else {
            console.error("[v0] Usuario no existe en Firestore, cerrando sesión")
            await signOut(auth)
            setUser(null)
          }
        } catch (error) {
          console.error("[v0] Error al obtener datos del usuario:", error)
          setUser(null)
        }
      } else {
        console.log("[v0] No hay usuario autenticado")
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      console.log("[v0] Intentando login con:", email)
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user

      const userDocRef = doc(firestore, "users", firebaseUser.uid)
      const userDoc = await getDoc(userDocRef)

      if (!userDoc.exists()) {
        throw new Error("Usuario no encontrado en la base de datos")
      }

      console.log("[v0] Login exitoso")
      updateActivity() // Actualizar actividad al iniciar sesión
    } catch (error: any) {
      console.error("[v0] Error en login:", error)
      throw new Error(error.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string, dni: string) => {
    setLoading(true)
    try {
      console.log("[v0] Intentando registro con:", email)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user

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

      console.log("[v0] Registro exitoso")
      updateActivity() // Actualizar actividad al registrarse
    } catch (error: any) {
      console.error("[v0] Error en registro:", error)
      throw new Error(error.message || "Error al registrarse")
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      console.log("[v0] Cerrando sesión")
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error("[v0] Error al cerrar sesión:", error)
    }
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
