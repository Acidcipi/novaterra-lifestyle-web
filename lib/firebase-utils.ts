import { doc, getDoc, setDoc, updateDoc, deleteField } from "firebase/firestore"
import { firestore } from "./firebase"

// Obtener favoritos del usuario
export async function getUserFavorites(userId: string): Promise<string[]> {
  try {
    const userDocRef = doc(firestore, "users", userId)
    const userDoc = await getDoc(userDocRef)
    
    if (userDoc.exists()) {
      const userData = userDoc.data()
      return userData.favoriteProperties || []
    }
    return []
  } catch (error) {
    console.error("[v0] Error al obtener favoritos:", error)
    return []
  }
}

// Agregar o quitar favorito
export async function setUserFavorites(userId: string, propertyId: string, isFavorite: boolean): Promise<void> {
  try {
    const userDocRef = doc(firestore, "users", userId)
    const userDoc = await getDoc(userDocRef)
    
    if (userDoc.exists()) {
      const currentFavorites = userDoc.data().favoriteProperties || []
      
      let updatedFavorites: string[]
      if (isFavorite) {
        // Agregar a favoritos si no está
        updatedFavorites = currentFavorites.includes(propertyId)
          ? currentFavorites
          : [...currentFavorites, propertyId]
      } else {
        // Quitar de favoritos
        updatedFavorites = currentFavorites.filter((id: string) => id !== propertyId)
      }
      
      await updateDoc(userDocRef, {
        favoriteProperties: updatedFavorites
      })
    }
  } catch (error) {
    console.error("[v0] Error al guardar favorito:", error)
    throw error
  }
}

// Obtener propiedades visitadas del usuario
export async function getUserVisitedProperties(userId: string): Promise<string[]> {
  try {
    const userDocRef = doc(firestore, "users", userId)
    const userDoc = await getDoc(userDocRef)
    
    if (userDoc.exists()) {
      const userData = userDoc.data()
      return userData.visitedProperties || []
    }
    return []
  } catch (error) {
    console.error("[v0] Error al obtener propiedades visitadas:", error)
    return []
  }
}

// Agregar propiedad visitada
export async function addVisitedProperty(userId: string, propertyId: string): Promise<void> {
  try {
    const userDocRef = doc(firestore, "users", userId)
    const userDoc = await getDoc(userDocRef)
    
    if (userDoc.exists()) {
      const currentVisited = userDoc.data().visitedProperties || []
      
      // Agregar al principio si no está, o moverlo al principio si ya existe
      const updatedVisited = [
        propertyId,
        ...currentVisited.filter((id: string) => id !== propertyId)
      ]
      
      await updateDoc(userDocRef, {
        visitedProperties: updatedVisited
      })
    }
  } catch (error) {
    console.error("[v0] Error al registrar visita:", error)
    throw error
  }
}

// Limpiar historial de visitadas
export async function clearVisitedProperties(userId: string): Promise<void> {
  try {
    const userDocRef = doc(firestore, "users", userId)
    await updateDoc(userDocRef, {
      visitedProperties: []
    })
  } catch (error) {
    console.error("[v0] Error al limpiar historial:", error)
    throw error
  }
}

// Actualizar perfil de usuario
export async function updateUserProfile(
  userId: string,
  data: { name?: string; dni?: string; phone?: string }
): Promise<void> {
  try {
    const userDocRef = doc(firestore, "users", userId)
    await updateDoc(userDocRef, data)
  } catch (error) {
    console.error("[v0] Error al actualizar perfil:", error)
    throw error
  }
}
