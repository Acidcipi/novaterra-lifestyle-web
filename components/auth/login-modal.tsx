"use client"

import type React from "react"

import { useState } from "react"
import { X, LogIn, Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-provider"
import { loginSchema, type LoginInput } from "@/lib/validations"
import { useRouter } from 'next/navigation'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToRegister: () => void
}

export function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [formData, setFormData] = useState<LoginInput>({ email: "", password: "" })
  const [errors, setErrors] = useState<Partial<LoginInput>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const { t } = useI18n()
  const router = useRouter()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsSubmitting(true)

    try {
      const validated = loginSchema.parse(formData)
      await login(validated.email, validated.password)
      onClose()
      router.push("/")
    } catch (error: any) {
      if (error.errors) {
        const fieldErrors: any = {}
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message
        })
        setErrors(fieldErrors)
      } else {
        // Mostrar error general en el campo de contraseña
        setErrors({ password: error.message || "Error al iniciar sesión" })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-md bg-[#1F1F1F] border border-[#D4AF37]/20 rounded-lg p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-[#D4AF37]" aria-label="Close">
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-serif font-bold text-[#D4AF37] mb-2">{t("auth.login")}</h2>
          <p className="text-gray-400 text-sm">Welcome back to LUXE Real Estate</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-white">
              {t("auth.email")}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-black border-[#D4AF37]/20 text-white focus:border-[#D4AF37]"
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="password" className="text-white">
              {t("auth.password")}
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-black border-[#D4AF37]/20 text-white focus:border-[#D4AF37] pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] transition-colors"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90 font-medium"
          >
            <LogIn className="h-4 w-4 mr-2" />
            {isSubmitting ? "Loading..." : t("auth.login")}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <button onClick={onSwitchToRegister} className="text-[#D4AF37] hover:underline font-medium">
              {t("auth.register")}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
