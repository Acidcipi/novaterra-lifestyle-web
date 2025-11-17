"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header/header"
import { Footer } from "@/components/footer/footer"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-provider"
import { LoginModal } from "@/components/auth/login-modal"
import { RegisterModal } from "@/components/auth/register-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from 'lucide-react'
import { isAdmin } from "@/lib/auth-helpers"

export default function ContactPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const { user, logout } = useAuth()
  const { t } = useI18n()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Contact form submitted:", formData)
    // Here you would send the form data to your backend
    alert("Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <main className="min-h-screen bg-black">
      <Header
        isAuthenticated={!!user}
        isAdmin={isAdmin(user)}
        onLoginClick={() => setShowLogin(true)}
        onLogout={logout}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-serif font-bold text-[#D4AF37] mb-8">{t("contact.title")}</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">{t("auth.name")}</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-[#1F1F1F] border-[#D4AF37]/20 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">{t("auth.email")}</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-[#1F1F1F] border-[#D4AF37]/20 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Teléfono</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-[#1F1F1F] border-[#D4AF37]/20 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">{t("contact.message")}</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="bg-[#1F1F1F] border-[#D4AF37]/20 text-white"
                />
              </div>
              <Button type="submit" className="w-full bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90">
                {t("contact.send")}
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Información de Contacto</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-[#D4AF37] mt-1" />
                  <div>
                    <h3 className="text-white font-bold mb-1">{t("footer.madrid")}</h3>
                    <p className="text-gray-400">Calle Serrano 123, 28001 Madrid, España</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-[#D4AF37] mt-1" />
                  <div>
                    <h3 className="text-white font-bold mb-1">{t("footer.barcelona")}</h3>
                    <p className="text-gray-400">Passeig de Gràcia 456, 08008 Barcelona, España</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-[#D4AF37]" />
                  <div>
                    <p className="text-white">+34 900 123 456</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-[#D4AF37]" />
                  <div>
                    <p className="text-white">info@novaterralifestyle.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1F1F1F] border border-[#D4AF37]/20 rounded-lg p-6">
              <h3 className="text-xl font-serif font-bold text-[#D4AF37] mb-3">Horario de Atención</h3>
              <div className="space-y-2 text-gray-400">
                <p>Lunes - Viernes: 9:00 - 20:00</p>
                <p>Sábado: 10:00 - 18:00</p>
                <p>Domingo: Cerrado</p>
              </div>
            </div>
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
