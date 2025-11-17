"use client"

import { useState } from "react"
import { Bed, Bath, Car, Heart } from 'lucide-react'
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Property } from "@/lib/types"
import { useI18n } from "@/lib/i18n-provider"
import { PropertyModal } from "./property-modal"
import { useAuth } from "@/lib/auth-context"
import { addVisitedProperty } from "@/lib/firebase-utils"

interface PropertyCardProps {
  property: Property
  onFavorite?: (id: string) => void
  isFavorite?: boolean
  showRegisterButton?: boolean
  onRegisterClick?: () => void
}

export function PropertyCard({
  property,
  onFavorite,
  isFavorite,
  showRegisterButton,
  onRegisterClick,
}: PropertyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useI18n()
  const { user } = useAuth()

  const handleOpenModal = async () => {
    setIsModalOpen(true)

    if (user) {
      try {
        await addVisitedProperty(user.id, property.id)
      } catch (error) {
        console.error("[v0] Error al registrar visita:", error)
      }
    }
  }

  return (
    <>
      <Card
        className="bg-[#1F1F1F] border-[#D4AF37]/20 overflow-hidden hover:border-[#D4AF37]/40 transition-all group cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="relative">
          <img
            src={property.images[0] || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {property.type === "vip" && (
            <div className="absolute top-4 left-4 bg-[#D4AF37] text-black px-3 py-1 text-xs font-bold rounded">VIP</div>
          )}
          {onFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onFavorite(property.id)
              }}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
              aria-label="Add to favorites"
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-[#D4AF37] text-[#D4AF37]" : "text-white"}`} />
            </button>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-serif font-bold text-[#D4AF37] mb-2">{property.title}</h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{property.description}</p>
          <div className="flex items-center gap-4 text-white mb-3">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-[#D4AF37]" />
              <span className="text-sm">{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-[#D4AF37]" />
              <span className="text-sm">{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Car className="h-4 w-4 text-[#D4AF37]" />
              <span className="text-sm">{property.parking}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-white text-sm">{property.location}</span>
            <span className="text-[#D4AF37] font-bold">€{property.price.toLocaleString()}</span>
          </div>

          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {showRegisterButton ? (
              <Button onClick={onRegisterClick} className="w-full bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90">
                {t("properties.register")}
              </Button>
            ) : (
              <Link href="/contact" className="w-full">
                <Button className="w-full bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90">
                  {t("properties.contact")}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
      <PropertyModal
        property={property}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        showRegisterButton={showRegisterButton}
        onRegisterClick={onRegisterClick}
      />
    </>
  )
}
