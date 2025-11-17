"use client"

import { useState } from "react"
import { X, Bed, Bath, Car, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Property } from "@/lib/types"
import { useI18n } from "@/lib/i18n-provider"

interface PropertyModalProps {
  property: Property
  isOpen: boolean
  onClose: () => void
  showRegisterButton?: boolean
  onRegisterClick?: () => void
}

export function PropertyModal({ property, isOpen, onClose, showRegisterButton, onRegisterClick }: PropertyModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { t } = useI18n()

  if (!isOpen) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#1F1F1F] border border-[#D4AF37]/20 rounded-lg my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image Gallery */}
        <div className="relative h-96 bg-black rounded-t-lg overflow-hidden">
          <img
            src={property.images[currentImageIndex] || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full ${
                      index === currentImageIndex ? "w-8 bg-[#D4AF37]" : "w-2 bg-white/50"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#D4AF37] mb-2">{property.title}</h2>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#D4AF37]">€{property.price.toLocaleString()}</div>
              {property.type === "vip" && (
                <div className="mt-1 bg-[#D4AF37] text-black px-3 py-1 text-xs font-bold rounded inline-block">
                  VIP EXCLUSIVE
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-[#D4AF37]/20">
            <div className="flex items-center gap-2 text-white">
              <Bed className="h-5 w-5 text-[#D4AF37]" />
              <span>
                {property.bedrooms} {t("properties.bedrooms")}
              </span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Bath className="h-5 w-5 text-[#D4AF37]" />
              <span>
                {property.bathrooms} {t("properties.bathrooms")}
              </span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Car className="h-5 w-5 text-[#D4AF37]" />
              <span>
                {property.parking} {t("properties.parking")}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-serif font-bold text-white mb-3">Description</h3>
            <p className="text-gray-400 leading-relaxed">{property.description}</p>
          </div>

          <div className="flex gap-3">
            {showRegisterButton ? (
              <Button
                onClick={onRegisterClick}
                className="flex-1 bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90 font-medium"
              >
                {t("properties.register")}
              </Button>
            ) : (
              <Button className="flex-1 bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90 font-medium">
                {t("properties.contact")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
