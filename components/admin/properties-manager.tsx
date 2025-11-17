"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { mockProperties } from "@/lib/mock-data"
import type { Property } from "@/lib/types"

export function PropertiesManager() {
  const [properties, setProperties] = useState(mockProperties)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    price: 0,
    location: "",
    type: "basic" as "basic" | "vip",
  })

  const handleEdit = (property: Property) => {
    setEditingProperty(property)
    setFormData({
      title: property.title,
      description: property.description,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      parking: property.parking,
      price: property.price,
      location: property.location,
      type: property.type,
    })
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      setProperties(properties.filter((p) => p.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingProperty) {
      setProperties(properties.map((p) => (p.id === editingProperty.id ? { ...p, ...formData } : p)))
    } else {
      const newProperty: Property = {
        ...formData,
        id: Date.now().toString(),
        images: ["/placeholder.svg?height=400&width=600"],
        featured: false,
        visits: 0,
      }
      setProperties([newProperty, ...properties])
    }

    setIsFormOpen(false)
    setEditingProperty(null)
    setFormData({
      title: "",
      description: "",
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
      price: 0,
      location: "",
      type: "basic",
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-white">Manage Properties</h2>
        <Button
          onClick={() => {
            setEditingProperty(null)
            setIsFormOpen(true)
          }}
          className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      {isFormOpen && (
        <div className="mb-6 bg-[#1F1F1F] border border-[#D4AF37]/20 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-serif font-bold text-[#D4AF37]">
              {editingProperty ? "Edit Property" : "Add New Property"}
            </h3>
            <button onClick={() => setIsFormOpen(false)} className="text-white hover:text-[#D4AF37]">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-white">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-black border-[#D4AF37]/20 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-white">
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-black border-[#D4AF37]/20 text-white"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-white">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-black border-[#D4AF37]/20 text-white min-h-24"
                required
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="bedrooms" className="text-white">
                  Bedrooms
                </Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number.parseInt(e.target.value) })}
                  className="bg-black border-[#D4AF37]/20 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="bathrooms" className="text-white">
                  Bathrooms
                </Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: Number.parseInt(e.target.value) })}
                  className="bg-black border-[#D4AF37]/20 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="parking" className="text-white">
                  Parking
                </Label>
                <Input
                  id="parking"
                  type="number"
                  value={formData.parking}
                  onChange={(e) => setFormData({ ...formData, parking: Number.parseInt(e.target.value) })}
                  className="bg-black border-[#D4AF37]/20 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="price" className="text-white">
                  Price (€)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) })}
                  className="bg-black border-[#D4AF37]/20 text-white"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-white mb-2 block">Type</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="radio"
                    value="basic"
                    checked={formData.type === "basic"}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as "basic" | "vip" })}
                    className="accent-[#D4AF37]"
                  />
                  Basic
                </label>
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="radio"
                    value="vip"
                    checked={formData.type === "vip"}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as "basic" | "vip" })}
                    className="accent-[#D4AF37]"
                  />
                  VIP
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90">
                {editingProperty ? "Update Property" : "Create Property"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
                className="border-[#D4AF37]/20 text-white hover:bg-[#D4AF37]/10"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-[#1F1F1F] border border-[#D4AF37]/20 rounded-lg p-4 flex items-center gap-4"
          >
            <img
              src={property.images[0] || "/placeholder.svg"}
              alt={property.title}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-lg font-serif font-bold text-[#D4AF37]">{property.title}</h3>
              <p className="text-gray-400 text-sm">{property.location}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-white">
                <span>{property.bedrooms} beds</span>
                <span>{property.bathrooms} baths</span>
                <span>€{property.price.toLocaleString()}</span>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    property.type === "vip" ? "bg-[#D4AF37] text-black" : "bg-gray-700 text-white"
                  }`}
                >
                  {property.type.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(property)}
                className="text-white hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(property.id)}
                className="text-white hover:text-red-500 hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
