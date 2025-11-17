export interface Property {
  id: string
  title: string
  description: string
  images: string[]
  bedrooms: number
  bathrooms: number
  parking: number
  price: number
  location: string
  province: string
  propertyType: "finca" | "casa" | "piso" | "atico" | "local" | "terreno" | "garaje"
  surfaceArea: number
  condition: "nuevo" | "buen-estado" | "a-reformar" | "obra-nueva"
  availability: "venta" | "alquiler" | "alquiler-opcion-compra"
  amenities: {
    garage: boolean
    storage: boolean
    garden: boolean
    pool: boolean
    terrace: boolean
  }
  featured: boolean
  type: "basic" | "vip"
  visits: number
  publishedDate: string
}

export interface User {
  id: string
  email: string
  name: string
  dni: string
  phone?: string
  role: "user" | "admin" | "owner"
  visitedProperties: string[]
  favoriteProperties: string[]
  createdAt: string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, dni: string) => Promise<void>
  logout: () => Promise<void>
}
