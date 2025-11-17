"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header/header"
import { Footer } from "@/components/footer/footer"
import { PropertyCard } from "@/components/properties/property-card"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-provider"
import { LoginModal } from "@/components/auth/login-modal"
import { RegisterModal } from "@/components/auth/register-modal"
import { mockProperties } from "@/lib/mock-data"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getUserVisitedProperties, clearVisitedProperties, getUserFavorites, setUserFavorites } from "@/lib/firebase-utils"

export default function VisitedPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [visited, setVisited] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user, logout } = useAuth()
  const { t } = useI18n()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }
    
    const loadData = async () => {
      try {
        const [userVisited, userFavorites] = await Promise.all([
          getUserVisitedProperties(user.id),
          getUserFavorites(user.id)
        ])
        setVisited(userVisited)
        setFavorites(userFavorites)
      } catch (error) {
        console.error("[v0] Error al cargar datos:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [user, router])

  const handleToggleFavorite = async (id: string) => {
    if (!user) return
    
    const isFavorite = favorites.includes(id)
    const newFavorites = isFavorite ? favorites.filter((fav) => fav !== id) : [...favorites, id]
    setFavorites(newFavorites)
    
    try {
      await setUserFavorites(user.id, id, !isFavorite)
    } catch (error) {
      console.error("[v0] Error al actualizar favorito:", error)
      setFavorites(favorites)
    }
  }

  const handleClearHistory = async () => {
    if (user && confirm(t("visited.confirm"))) {
      try {
        await clearVisitedProperties(user.id)
        setVisited([])
      } catch (error) {
        console.error("[v0] Error al limpiar historial:", error)
      }
    }
  }

  const visitedProperties = mockProperties.filter((prop) => visited.includes(prop.id))

  if (!mounted || !user || loading) {
    return null
  }

  return (
    <main className="min-h-screen bg-black">
      <Header
        isAuthenticated={!!user}
        isAdmin={user?.role === "admin"}
        onLoginClick={() => setShowLogin(true)}
        onLogout={logout}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-serif font-bold text-[#D4AF37]">{t("visited.title")}</h1>
          {visitedProperties.length > 0 && (
            <Button
              onClick={handleClearHistory}
              variant="outline"
              className="border-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/10 bg-transparent"
            >
              {t("visited.clear")}
            </Button>
          )}
        </div>
        <p className="text-gray-400 mb-8">{t("visited.description")}</p>

        {visitedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visitedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(property.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-[#D4AF37]/20 rounded-lg bg-[#1F1F1F]">
            <p className="text-gray-400 text-lg mb-6">{t("visited.empty")}</p>
            <Link href="/properties">
              <button className="bg-[#D4AF37] text-black px-8 py-3 rounded font-medium hover:bg-[#D4AF37]/90 transition-colors">
                {t("visited.browse")}
              </button>
            </Link>
          </div>
        )}
      </section>

      <Footer />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false)
          setShowRegister(true)
        }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false)
          setShowLogin(true)
        }}
      />
    </main>
  )
}
