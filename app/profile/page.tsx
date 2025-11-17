"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header/header"
import { Footer } from "@/components/footer/footer"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-provider"
import { LoginModal } from "@/components/auth/login-modal"
import { RegisterModal } from "@/components/auth/register-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dni: "",
    phone: "",
  })
  const { user, logout } = useAuth()
  const { t } = useI18n()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }
    setFormData({
      name: user.name,
      email: user.email,
      dni: user.dni || "",
      phone: user.phone || "",
    })
  }, [user, router])

  const handleSave = () => {
    // Save changes to localStorage (in real app, this would be an API call)
    if (user) {
      const updatedUser = { ...user, ...formData }
      localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedUser))
      setIsEditing(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  if (!user) {
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

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-serif font-bold text-[#D4AF37]">{t("profile.title")}</h1>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90">
              {t("profile.edit")}
            </Button>
          )}
        </div>

        {showSuccess && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
            {t("profile.success")}
          </div>
        )}

        <div className="bg-[#1F1F1F] border border-[#D4AF37]/20 rounded-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2">{t("profile.name")}</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="bg-black border-[#D4AF37]/20 text-white disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">{t("profile.email")}</label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                type="email"
                className="bg-black border-[#D4AF37]/20 text-white disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">{t("auth.dni")}</label>
              <Input
                value={formData.dni}
                onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                disabled={!isEditing}
                className="bg-black border-[#D4AF37]/20 text-white disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">{t("profile.phone")}</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                type="tel"
                className="bg-black border-[#D4AF37]/20 text-white disabled:opacity-60"
              />
            </div>

            {isEditing && (
              <div className="flex gap-4 pt-4">
                <Button onClick={handleSave} className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90">
                  {t("profile.save")}
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                >
                  {t("profile.cancel")}
                </Button>
              </div>
            )}
          </div>
        </div>
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
