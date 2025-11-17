"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { Header } from "@/components/header/header"
import { Footer } from "@/components/footer/footer"
import { PropertyCard } from "@/components/properties/property-card"
import { mockProperties } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { isAdmin } from "@/lib/auth-helpers"
import { useI18n } from "@/lib/i18n-provider"
import { LoginModal } from "@/components/auth/login-modal"
import { RegisterModal } from "@/components/auth/register-modal"
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ExperiencesPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [favorites, setFavorites] = useState<string[]>([])
  const searchParams = useSearchParams()
  const typeParam = searchParams.get("type") as "basic" | "vip" | null
  const { user, logout } = useAuth()
  const { t } = useI18n()

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`favorites_${user.email}`)
      if (saved) {
        setFavorites(JSON.parse(saved))
      }
    }
  }, [user])

  const handleToggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id) ? favorites.filter((fav) => fav !== id) : [...favorites, id]
    setFavorites(newFavorites)
    if (user) {
      localStorage.setItem(`favorites_${user.email}`, JSON.stringify(newFavorites))
    }
  }

  const filteredProperties = typeParam ? mockProperties.filter((p) => p.type === typeParam) : mockProperties

  const displayProperties = user ? filteredProperties : filteredProperties.slice(0, 6)
  const totalPages = Math.ceil(displayProperties.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProperties = displayProperties.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-black">
      <Header
        isAuthenticated={!!user}
        isAdmin={isAdmin(user)}
        onLoginClick={() => setShowLogin(true)}
        onLogout={logout}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-[#D4AF37] mb-4">{t("experiences.title")}</h1>
          <p className="text-gray-400 mb-4">{t("experiences.description")}</p>

          {/* Filter buttons */}

          {user && (
            <div className="flex items-center justify-between">
              <p className="text-gray-400">
                {t("properties.showing")
                  .replace("{current}", String(displayProperties.length))
                  .replace("{total}", String(filteredProperties.length))}
              </p>
              <div className="flex items-center gap-2">
                <label className="text-gray-400 text-sm">{t("experiences.itemsPerPage")}</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="bg-[#1F1F1F] border border-[#D4AF37]/20 text-white rounded px-3 py-1"
                >
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onFavorite={user ? handleToggleFavorite : undefined}
              isFavorite={favorites.includes(property.id)}
              showRegisterButton={!user}
              onRegisterClick={() => setShowRegister(true)}
            />
          ))}
        </div>

        {user && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded border border-[#D4AF37]/20 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#D4AF37]/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded ${
                    page === currentPage
                      ? "bg-[#D4AF37] text-black"
                      : "bg-[#1F1F1F] text-white border border-[#D4AF37]/20 hover:bg-[#D4AF37]/10"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded border border-[#D4AF37]/20 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#D4AF37]/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {!user && (
          <div className="text-center mt-12 p-8 border border-[#D4AF37]/20 rounded-lg bg-[#1F1F1F]">
            <h3 className="text-2xl font-serif font-bold text-[#D4AF37] mb-3">Want to See More?</h3>
            <p className="text-gray-400 mb-6">
              Register now to access our complete collection of exclusive experiences.
            </p>
            <button
              onClick={() => setShowRegister(true)}
              className="bg-[#D4AF37] text-black px-8 py-3 rounded font-medium hover:bg-[#D4AF37]/90 transition-colors"
            >
              Register Now
            </button>
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
