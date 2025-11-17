"use client"

import type React from "react"

import { useState } from "react"
import { X, UserPlus, Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-provider"
import { registerSchema, type RegisterInput } from "@/lib/validations"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [formData, setFormData] = useState<RegisterInput>({
    name: "",
    email: "",
    password: "",
    dni: "",
    acceptTerms: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterInput, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { register } = useAuth()
  const { t } = useI18n()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsSubmitting(true)

    try {
      const validated = registerSchema.parse(formData)
      await register(validated.email, validated.password, validated.name, validated.dni)
      onClose()
    } catch (error: any) {
      if (error.errors) {
        const fieldErrors: any = {}
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message
        })
        setErrors(fieldErrors)
      } else {
        // Mostrar error general en el campo de email
        setErrors({ email: error.message || "Error al registrarse" })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-md bg-[#1F1F1F] border border-[#D4AF37]/20 rounded-lg p-6 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-[#D4AF37]" aria-label="Close">
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-serif font-bold text-[#D4AF37] mb-2">{t("auth.register")}</h2>
          <p className="text-gray-400 text-sm">Join LUXE Real Estate today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">
              {t("auth.name")}
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-black border-[#D4AF37]/20 text-white focus:border-[#D4AF37]"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

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
            <Label htmlFor="dni" className="text-white">
              {t("auth.dni")}
            </Label>
            <Input
              id="dni"
              type="text"
              value={formData.dni}
              onChange={(e) => setFormData({ ...formData, dni: e.target.value.toUpperCase() })}
              className="bg-black border-[#D4AF37]/20 text-white focus:border-[#D4AF37]"
              placeholder="12345678A"
            />
            {errors.dni && <p className="text-red-500 text-sm mt-1">{errors.dni}</p>}
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

          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
              className="border-[#D4AF37]/20 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black mt-1"
            />
            <Label htmlFor="terms" className="text-white text-sm cursor-pointer">
              {t("auth.accept")}{" "}
              <a href="/legal?tab=terms" className="text-[#D4AF37] hover:underline">
                terms and conditions
              </a>
            </Label>
          </div>
          {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90 font-medium"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {isSubmitting ? "Loading..." : t("auth.register")}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <button onClick={onSwitchToLogin} className="text-[#D4AF37] hover:underline font-medium">
              {t("auth.login")}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
