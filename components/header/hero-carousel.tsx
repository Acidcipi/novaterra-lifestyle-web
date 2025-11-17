"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const carouselImages = [
  {
    url: "/luxury-villa-with-infinity-pool-at-sunset.jpg",
    alt: "Luxury villa with infinity pool",
  },
  {
    url: "/elegant-penthouse-with-panoramic-city-skyline-view.jpg",
    alt: "Penthouse with panoramic city view",
  },
  {
    url: "/beachfront-luxury-property-with-ocean-view.jpg",
    alt: "Beachfront luxury estate",
  },
  {
    url: "/mountain-luxury-chalet-with-snow.jpg",
    alt: "Mountain luxury chalet",
  },
  {
    url: "/modern-luxury-apartment-interior-with-gold-accents.jpg",
    alt: "Modern luxury apartment",
  },
]

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(goToNext, 5000)
    return () => clearInterval(interval)
  }, [isPlaying, goToNext])

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-black">
      {/* Images */}
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== currentIndex}
        >
          <img
            src={image.url || "/placeholder.svg"}
            alt={image.alt}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          className="bg-black/50 hover:bg-black/70 text-[#D4AF37] rounded-full h-12 w-12"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="bg-black/50 hover:bg-black/70 text-[#D4AF37] rounded-full h-12 w-12"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Play/Pause Button */}
      <div className="absolute bottom-20 right-4 md:right-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-black/50 hover:bg-black/70 text-[#D4AF37] rounded-full h-10 w-10"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2" role="tablist">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-[#D4AF37]" : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === currentIndex}
            role="tab"
          />
        ))}
      </div>
    </div>
  )
}
