"use client"

import { useState } from "react"
import { Upload, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const initialImages = [
  { id: "1", url: "/luxury-villa-sunset.png", alt: "Luxury villa" },
  { id: "2", url: "/elegant-penthouse-with-city-skyline-view.jpg", alt: "Penthouse" },
  { id: "3", url: "/beachfront-luxury-property-with-ocean-view.jpg", alt: "Beachfront" },
  { id: "4", url: "/mountain-luxury-chalet-with-snow.jpg", alt: "Mountain chalet" },
  { id: "5", url: "/modern-luxury-apartment-interior-gold-accents.jpg", alt: "Modern apartment" },
]

export function HeaderManager() {
  const [images, setImages] = useState(initialImages)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      setImages(images.filter((img) => img.id !== id))
    }
  }

  const handleUpload = () => {
    alert("File upload functionality would be implemented here using Vercel Blob or Firebase Storage")
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-white">Header Carousel Images</h2>
          <p className="text-gray-400 mt-2">Manage the images displayed in the hero carousel</p>
        </div>
        <Button onClick={handleUpload} className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90">
          <Upload className="h-4 w-4 mr-2" />
          Upload Image
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="relative bg-[#1F1F1F] border border-[#D4AF37]/20 rounded-lg overflow-hidden group"
          >
            <img src={image.url || "/placeholder.svg"} alt={image.alt} className="w-full h-48 object-cover" />
            <div className="absolute top-2 left-2 bg-black/70 text-[#D4AF37] px-2 py-1 rounded text-sm font-bold">
              #{index + 1}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(image.id)}
              className="absolute top-2 right-2 bg-black/70 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="p-3 bg-[#1F1F1F]">
              <p className="text-white text-sm font-medium">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-[#1F1F1F] border border-[#D4AF37]/20 rounded-lg">
        <h3 className="text-white font-medium mb-2">Upload Guidelines</h3>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• Recommended size: 1920x1080px (16:9 aspect ratio)</li>
          <li>• Maximum file size: 5MB</li>
          <li>• Supported formats: JPG, PNG, WebP</li>
          <li>• Images will be optimized automatically</li>
        </ul>
      </div>
    </div>
  )
}
