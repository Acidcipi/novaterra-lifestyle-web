"use client"

import { useState } from "react"
import { Header } from "@/components/header/header"
import { Footer } from "@/components/footer/footer"
import { CookieBanner } from "@/components/footer/cookie-banner"
import { PropertyCard } from "@/components/properties/property-card"
import { mockProperties } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { isAdmin } from "@/lib/auth-helpers"
import { useI18n } from "@/lib/i18n-provider"
import { LoginModal } from "@/components/auth/login-modal"
import { RegisterModal } from "@/components/auth/register-modal"

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const { user, logout } = useAuth()
  const { t } = useI18n()

  const latestListings = mockProperties.slice(0, 3)

  return (
    <main className="min-h-screen bg-black">
      <Header
        isAuthenticated={!!user}
        isAdmin={isAdmin(user)}
        onLoginClick={() => setShowLogin(true)}
        onLogout={logout}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="text-center mb-12">
          {!user ? (
            <>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#D4AF37] mb-6">
                {t("home.welcome.guest.title")}
              </h1>
              <div className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed space-y-4">
                <p>{t("home.welcome.guest.p1")}</p>
                <p>{t("home.welcome.guest.p2")}</p>
                <p>{t("home.welcome.guest.p3")}</p>
                <p>{t("home.welcome.guest.p4")}</p>
                <p className="font-semibold text-[#D4AF37]">{t("home.welcome.guest.p5")}</p>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#D4AF37] mb-6">
                {t("home.welcome.auth.title")}
              </h1>
              <div className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed space-y-3">
                <p className="font-semibold">{t("home.welcome.auth.p1")}</p>
                <p>{t("home.welcome.auth.p2")}</p>
                <p>{t("home.welcome.auth.p3")}</p>
                <p>{t("home.welcome.auth.p4")}</p>
                <p>{t("home.welcome.auth.p5")}</p>
              </div>
            </>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-white mb-6">{t("home.latest")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestListings.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                showRegisterButton={!user}
                onRegisterClick={() => setShowRegister(true)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <CookieBanner />

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
