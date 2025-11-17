"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { Header } from "@/components/header/header"
import { Footer } from "@/components/footer/footer"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-provider"
import { LoginModal } from "@/components/auth/login-modal"
import { RegisterModal } from "@/components/auth/register-modal"
import { isAdmin } from "@/lib/auth-helpers"

export default function LegalPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [activeTab, setActiveTab] = useState<"privacy" | "terms" | "cookies">("privacy")
  const { user, logout } = useAuth()
  const { t } = useI18n()
  const searchParams = useSearchParams()

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "privacy" || tab === "terms" || tab === "cookies") {
      setActiveTab(tab)
    }
  }, [searchParams])

  return (
    <main className="min-h-screen bg-black">
      <Header
        isAuthenticated={!!user}
        isAdmin={isAdmin(user)}
        onLoginClick={() => setShowLogin(true)}
        onLogout={logout}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <h1 className="text-4xl font-serif font-bold text-[#D4AF37] mb-8">{t("footer.legal.title")}</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto border-b border-[#D4AF37]/20">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
              activeTab === "privacy" ? "text-[#D4AF37] border-b-2 border-[#D4AF37]" : "text-gray-400 hover:text-white"
            }`}
          >
            {t("footer.privacy")}
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
              activeTab === "terms" ? "text-[#D4AF37] border-b-2 border-[#D4AF37]" : "text-gray-400 hover:text-white"
            }`}
          >
            {t("footer.terms")}
          </button>
          <button
            onClick={() => setActiveTab("cookies")}
            className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
              activeTab === "cookies" ? "text-[#D4AF37] border-b-2 border-[#D4AF37]" : "text-gray-400 hover:text-white"
            }`}
          >
            {t("footer.cookies")}
          </button>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {activeTab === "privacy" && (
            <div className="space-y-6 text-gray-300">
              <p className="text-gray-400 mb-8">Última actualización: Enero 2025</p>
              <section>
                <h2 className="text-2xl font-serif font-bold text-white mb-3">1. Introducción</h2>
                <p className="leading-relaxed">
                  Novaterra Lifestyle ("nosotros", "nuestro" o "nos") está comprometido con la protección de su
                  privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su
                  información cuando visita nuestro sitio web y utiliza nuestros servicios.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-white mb-3">2. Información que Recopilamos</h2>
                <p className="leading-relaxed mb-3">Recopilamos información que nos proporciona directamente:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Información de identificación personal (nombre, email, teléfono)</li>
                  <li>Identificación gubernamental (DNI/Pasaporte)</li>
                  <li>Preferencias de propiedades e historial de búsqueda</li>
                  <li>Registros de comunicación con nuestros agentes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-white mb-3">3. Cómo Usamos su Información</h2>
                <p className="leading-relaxed mb-3">Usamos la información recopilada para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Proporcionar y mejorar nuestros servicios</li>
                  <li>Procesar sus consultas y transacciones de propiedades</li>
                  <li>Comunicarnos con usted sobre propiedades y servicios</li>
                  <li>Cumplir con obligaciones legales</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-white mb-3">4. Seguridad de los Datos</h2>
                <p className="leading-relaxed">
                  Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales contra
                  acceso no autorizado, alteración, divulgación o destrucción. Todas las transmisiones de datos están
                  encriptadas usando HTTPS, y la información sensible se almacena de forma segura.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-white mb-3">5. Sus Derechos</h2>
                <p className="leading-relaxed mb-3">Bajo GDPR y leyes de protección de datos, usted tiene derecho a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Acceder a sus datos personales</li>
                  <li>Rectificar datos inexactos</li>
                  <li>Solicitar eliminación de sus datos</li>
                  <li>Oponerse al procesamiento de sus datos</li>
                  <li>Portabilidad de datos</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-white mb-3">6. Contacto</h2>
                <p className="leading-relaxed">
                  Si tiene preguntas sobre esta Política de Privacidad, contáctenos en privacy@novaterra-lifestyle.com
                </p>
              </section>
            </div>
          )}

          {activeTab === "terms" && (
            <div className="space-y-6 text-gray-300">
              <p className="text-gray-400 mb-8">Última actualización: Enero 2025</p>
              <section>
                <h2 className="text-2xl font-serif font-bold text-white mb-3">1. Aceptación de Términos</h2>
                <p className="leading-relaxed">
                  Al acceder y usar el sitio web de Novaterra Lifestyle, usted acepta estar sujeto a estos Términos de
                  Servicio y todas las leyes y regulaciones aplicables.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-white mb-3">2. Uso del Servicio</h2>
                <p className="leading-relaxed mb-3">Usted se compromete a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Proporcionar información precisa y completa</li>
                  <li>Mantener la seguridad de su cuenta</li>
                  <li>No usar el servicio para fines ilegales</li>
                  <li>Respetar los derechos de propiedad intelectual</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-white mb-3">3. Transacciones de Propiedades</h2>
                <p className="leading-relaxed">
                  Todas las transacciones están sujetas a verificación y aprobación. Los precios mostrados son
                  indicativos y pueden estar sujetos a cambios sin previo aviso.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-white mb-3">4. Limitación de Responsabilidad</h2>
                <p className="leading-relaxed">
                  Novaterra Lifestyle no será responsable de ningún daño indirecto, incidental, especial o consecuente
                  que resulte del uso o la imposibilidad de usar nuestros servicios.
                </p>
              </section>
            </div>
          )}

          {activeTab === "cookies" && (
            <div className="space-y-6 text-gray-300">
              <p className="text-gray-400 mb-8">Última actualización: Enero 2025</p>
              <section>
                <h2 className="text-2xl font-serif font-bold text-white mb-3">1. ¿Qué son las Cookies?</h2>
                <p className="leading-relaxed">
                  Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro
                  sitio web. Nos ayudan a proporcionar una mejor experiencia de usuario.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-white mb-3">2. Tipos de Cookies que Usamos</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-white">Cookies Esenciales:</strong> Necesarias para el funcionamiento del
                    sitio
                  </li>
                  <li>
                    <strong className="text-white">Cookies de Rendimiento:</strong> Nos ayudan a mejorar el sitio
                  </li>
                  <li>
                    <strong className="text-white">Cookies de Funcionalidad:</strong> Recuerdan sus preferencias
                  </li>
                  <li>
                    <strong className="text-white">Cookies de Marketing:</strong> Para mostrar anuncios relevantes
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-white mb-3">3. Gestión de Cookies</h2>
                <p className="leading-relaxed">
                  Puede controlar y/o eliminar las cookies según lo desee. Puede eliminar todas las cookies que ya están
                  en su computadora y puede configurar la mayoría de los navegadores para evitar que se coloquen.
                </p>
              </section>
            </div>
          )}
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
