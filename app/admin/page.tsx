"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Header } from "@/components/header/header"
import { useAuth } from "@/lib/auth-context"
import { isAdmin } from "@/lib/auth-helpers"
import { LoginModal } from "@/components/auth/login-modal"
import { RegisterModal } from "@/components/auth/register-modal"
import { Building2, Users, ImageIcon } from 'lucide-react'
import { PropertiesManager } from "@/components/admin/properties-manager"
import { UsersManager } from "@/components/admin/users-manager"
import { HeaderManager } from "@/components/admin/header-manager"

export default function AdminPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [activeTab, setActiveTab] = useState<"properties" | "users" | "header">("properties")
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user || !isAdmin(user)) {
    router.push("/")
    return null
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
        <h1 className="text-4xl font-serif font-bold text-[#D4AF37] mb-8">Admin Dashboard</h1>

        <div className="flex gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("properties")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === "properties"
                ? "bg-[#D4AF37] text-black"
                : "bg-[#1F1F1F] text-white border border-[#D4AF37]/20 hover:border-[#D4AF37]/40"
            }`}
          >
            <Building2 className="h-5 w-5" />
            Properties
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === "users"
                ? "bg-[#D4AF37] text-black"
                : "bg-[#1F1F1F] text-white border border-[#D4AF37]/20 hover:border-[#D4AF37]/40"
            }`}
          >
            <Users className="h-5 w-5" />
            Users
          </button>
          <button
            onClick={() => setActiveTab("header")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === "header"
                ? "bg-[#D4AF37] text-black"
                : "bg-[#1F1F1F] text-white border border-[#D4AF37]/20 hover:border-[#D4AF37]/40"
            }`}
          >
            <ImageIcon className="h-5 w-5" />
            Header Images
          </button>
        </div>

        {activeTab === "properties" && <PropertiesManager />}
        {activeTab === "users" && <UsersManager />}
        {activeTab === "header" && <HeaderManager />}
      </section>

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
