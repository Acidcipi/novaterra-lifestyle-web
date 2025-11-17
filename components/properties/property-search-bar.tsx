"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, X, SlidersHorizontal, Home, MapPin, Euro, BedDouble, Square, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { spanishProvinces } from "@/lib/spanish-provinces"
import { useI18n } from "@/lib/i18n-provider"
import { mockProperties } from "@/lib/mock-data"

interface PropertySearchFilters {
  location: string
  province: string
  propertyType: string
  minPrice: number
  maxPrice: number
  minBedrooms: number
  maxBedrooms: number
  minSurface: number
  maxSurface: number
  condition: string
  availability: string
  amenities: {
    garage: boolean
    storage: boolean
    garden: boolean
    pool: boolean
    terrace: boolean
    elevator: boolean
    ac: boolean
    heating: boolean
    balcony: boolean
    securitySystem: boolean
  }
  sortBy: "price-asc" | "price-desc" | "surface-asc" | "surface-desc" | "date-desc"
}

interface PropertySearchBarProps {
  onFilterChange?: (results: any[]) => void
}

export function PropertySearchBar({ onFilterChange }: PropertySearchBarProps) {
  const { t } = useI18n()
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const [filters, setFilters] = useState<PropertySearchFilters>({
    location: "",
    province: "",
    propertyType: "",
    minPrice: 0,
    maxPrice: 10000000,
    minBedrooms: 0,
    maxBedrooms: 10,
    minSurface: 0,
    maxSurface: 1000,
    condition: "",
    availability: "",
    amenities: {
      garage: false,
      storage: false,
      garden: false,
      pool: false,
      terrace: false,
      elevator: false,
      ac: false,
      heating: false,
      balcony: false,
      securitySystem: false,
    },
    sortBy: "date-desc",
  })

  // Get unique locations for autocomplete
  const uniqueLocations = useMemo(() => {
    return Array.from(new Set(mockProperties.map((p) => p.location)))
      .filter((loc) => loc.toLowerCase().includes(filters.location.toLowerCase()))
      .slice(0, 5)
  }, [filters.location])

  const filteredProperties = useMemo(() => {
    let results = [...mockProperties]

    if (filters.location) {
      results = results.filter((p) => p.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    if (filters.province) {
      results = results.filter((p) => p.province === filters.province)
    }

    if (filters.propertyType) {
      results = results.filter((p) => p.propertyType === filters.propertyType)
    }

    results = results.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice)

    if (filters.minBedrooms > 0) {
      results = results.filter((p) => p.bedrooms >= filters.minBedrooms)
    }

    if (filters.maxBedrooms < 10) {
      results = results.filter((p) => p.bedrooms <= filters.maxBedrooms)
    }

    results = results.filter((p) => p.surfaceArea >= filters.minSurface && p.surfaceArea <= filters.maxSurface)

    if (filters.condition) {
      results = results.filter((p) => p.condition === filters.condition)
    }

    if (filters.availability) {
      results = results.filter((p) => p.availability === filters.availability)
    }

    // Filter by amenities
    if (filters.amenities.garage) {
      results = results.filter((p) => p.amenities.garage)
    }
    if (filters.amenities.storage) {
      results = results.filter((p) => p.amenities.storage)
    }
    if (filters.amenities.garden) {
      results = results.filter((p) => p.amenities.garden)
    }
    if (filters.amenities.pool) {
      results = results.filter((p) => p.amenities.pool)
    }
    if (filters.amenities.terrace) {
      results = results.filter((p) => p.amenities.terrace)
    }

    // Sort results
    switch (filters.sortBy) {
      case "price-asc":
        results.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        results.sort((a, b) => b.price - a.price)
        break
      case "surface-asc":
        results.sort((a, b) => a.surfaceArea - b.surfaceArea)
        break
      case "surface-desc":
        results.sort((a, b) => b.surfaceArea - a.surfaceArea)
        break
      case "date-desc":
        results.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
        break
    }

    return results
  }, [filters])

  useEffect(() => {
    onFilterChange?.(filteredProperties)
  }, [filteredProperties, onFilterChange])

  const resetFilters = () => {
    setFilters({
      location: "",
      province: "",
      propertyType: "",
      minPrice: 0,
      maxPrice: 10000000,
      minBedrooms: 0,
      maxBedrooms: 10,
      minSurface: 0,
      maxSurface: 1000,
      condition: "",
      availability: "",
      amenities: {
        garage: false,
        storage: false,
        garden: false,
        pool: false,
        terrace: false,
        elevator: false,
        ac: false,
        heating: false,
        balcony: false,
        securitySystem: false,
      },
      sortBy: "date-desc",
    })
  }

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.location) count++
    if (filters.province) count++
    if (filters.propertyType) count++
    if (filters.minPrice > 0) count++
    if (filters.maxPrice < 10000000) count++
    if (filters.minBedrooms > 0) count++
    if (filters.maxBedrooms < 10) count++
    if (filters.minSurface > 0) count++
    if (filters.maxSurface < 1000) count++
    if (filters.condition) count++
    if (filters.availability) count++
    if (Object.values(filters.amenities).some((v) => v)) count++
    return count
  }, [filters])

  return (
    <div className="bg-[#1F1F1F] border border-[#D4AF37]/20 rounded-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Search className="h-6 w-6 text-[#D4AF37]" />
        <h2 className="text-2xl font-serif font-bold text-[#D4AF37]">{t("search.title")}</h2>
        {activeFiltersCount > 0 && (
          <Badge className="bg-[#D4AF37] text-black">
            {activeFiltersCount} {t("search.results")}
          </Badge>
        )}
      </div>

      <div className="space-y-6">
        {/* Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Location with autocomplete */}
          <div className="space-y-2">
            <Label className="text-gray-300 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {t("search.location")}
            </Label>
            <div className="relative">
              <Input
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                placeholder={t("search.location.placeholder")}
                className="bg-black border-[#D4AF37]/20 text-white"
              />
              {filters.location && uniqueLocations.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-black border border-[#D4AF37]/20 rounded-md shadow-lg max-h-40 overflow-auto">
                  {uniqueLocations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setFilters({ ...filters, location: loc })}
                      className="w-full text-left px-4 py-2 hover:bg-[#D4AF37]/10 text-white"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Province */}
          <div className="space-y-2">
            <Label className="text-gray-300">{t("search.province")}</Label>
            <Select value={filters.province} onValueChange={(value) => setFilters({ ...filters, province: value })}>
              <SelectTrigger className="bg-black border-[#D4AF37]/20 text-white">
                <SelectValue placeholder={t("search.province.placeholder")} />
              </SelectTrigger>
              <SelectContent className="bg-black border-[#D4AF37]/20 text-white max-h-[300px]">
                <SelectItem value="all">{t("search.all")}</SelectItem>
                {spanishProvinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label className="text-gray-300 flex items-center gap-2">
              <Home className="h-4 w-4" />
              {t("search.propertyType")}
            </Label>
            <Select
              value={filters.propertyType}
              onValueChange={(value) => setFilters({ ...filters, propertyType: value })}
            >
              <SelectTrigger className="bg-black border-[#D4AF37]/20 text-white">
                <SelectValue placeholder={t("search.propertyType.placeholder")} />
              </SelectTrigger>
              <SelectContent className="bg-black border-[#D4AF37]/20 text-white">
                <SelectItem value="all">{t("search.all")}</SelectItem>
                <SelectItem value="finca">{t("search.propertyType.finca")}</SelectItem>
                <SelectItem value="casa">{t("search.propertyType.casa")}</SelectItem>
                <SelectItem value="piso">{t("search.propertyType.piso")}</SelectItem>
                <SelectItem value="atico">{t("search.propertyType.atico")}</SelectItem>
                <SelectItem value="local">{t("search.propertyType.local")}</SelectItem>
                <SelectItem value="terreno">{t("search.propertyType.terreno")}</SelectItem>
                <SelectItem value="garaje">{t("search.propertyType.garaje")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label className="text-gray-300">{t("search.availability")}</Label>
            <Select
              value={filters.availability}
              onValueChange={(value) => setFilters({ ...filters, availability: value })}
            >
              <SelectTrigger className="bg-black border-[#D4AF37]/20 text-white">
                <SelectValue placeholder={t("search.availability.placeholder")} />
              </SelectTrigger>
              <SelectContent className="bg-black border-[#D4AF37]/20 text-white">
                <SelectItem value="all">{t("search.all")}</SelectItem>
                <SelectItem value="venta">{t("search.availability.venta")}</SelectItem>
                <SelectItem value="alquiler">{t("search.availability.alquiler")}</SelectItem>
                <SelectItem value="alquiler-opcion-compra">{t("search.availability.alquilerOpcion")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-gray-300 flex items-center gap-2">
            <Euro className="h-4 w-4" />
            {t("search.priceRange")}: €{filters.minPrice.toLocaleString()} - €{filters.maxPrice.toLocaleString()}
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
              placeholder={t("search.minPrice")}
              className="bg-black border-[#D4AF37]/20 text-white"
            />
            <Input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
              placeholder={t("search.maxPrice")}
              className="bg-black border-[#D4AF37]/20 text-white"
            />
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="w-full border-[#D4AF37]/20 bg-black text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          {showAdvancedFilters ? t("search.hideAdvanced") : t("search.showAdvanced")}
        </Button>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="space-y-6 pt-4 border-t border-[#D4AF37]/20">
            {/* Bedrooms Range */}
            <div className="space-y-3">
              <Label className="text-gray-300 flex items-center gap-2">
                <BedDouble className="h-4 w-4" />
                {t("search.bedrooms")}: {filters.minBedrooms} - {filters.maxBedrooms}
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  value={filters.minBedrooms}
                  onChange={(e) => setFilters({ ...filters, minBedrooms: Number(e.target.value) })}
                  placeholder={t("search.min")}
                  className="bg-black border-[#D4AF37]/20 text-white"
                />
                <Input
                  type="number"
                  value={filters.maxBedrooms}
                  onChange={(e) => setFilters({ ...filters, maxBedrooms: Number(e.target.value) })}
                  placeholder={t("search.max")}
                  className="bg-black border-[#D4AF37]/20 text-white"
                />
              </div>
            </div>

            {/* Surface Area Range */}
            <div className="space-y-3">
              <Label className="text-gray-300 flex items-center gap-2">
                <Square className="h-4 w-4" />
                {t("search.surface")}: {filters.minSurface}m² - {filters.maxSurface}m²
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  value={filters.minSurface}
                  onChange={(e) => setFilters({ ...filters, minSurface: Number(e.target.value) })}
                  placeholder={t("search.min")}
                  className="bg-black border-[#D4AF37]/20 text-white"
                />
                <Input
                  type="number"
                  value={filters.maxSurface}
                  onChange={(e) => setFilters({ ...filters, maxSurface: Number(e.target.value) })}
                  placeholder={t("search.max")}
                  className="bg-black border-[#D4AF37]/20 text-white"
                />
              </div>
            </div>

            {/* Condition */}
            <div className="space-y-2">
              <Label className="text-gray-300">{t("search.condition")}</Label>
              <Select value={filters.condition} onValueChange={(value) => setFilters({ ...filters, condition: value })}>
                <SelectTrigger className="bg-black border-[#D4AF37]/20 text-white">
                  <SelectValue placeholder={t("search.condition.placeholder")} />
                </SelectTrigger>
                <SelectContent className="bg-black border-[#D4AF37]/20 text-white">
                  <SelectItem value="all">{t("search.all")}</SelectItem>
                  <SelectItem value="nuevo">{t("search.condition.nuevo")}</SelectItem>
                  <SelectItem value="buen-estado">{t("search.condition.buenEstado")}</SelectItem>
                  <SelectItem value="a-reformar">{t("search.condition.aReformar")}</SelectItem>
                  <SelectItem value="obra-nueva">{t("search.condition.obraNueva")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-300">{t("search.amenities")}</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {(Object.keys(filters.amenities) as Array<keyof typeof filters.amenities>).map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={filters.amenities[amenity]}
                      onCheckedChange={(checked) =>
                        setFilters({
                          ...filters,
                          amenities: { ...filters.amenities, [amenity]: checked as boolean },
                        })
                      }
                      className="border-[#D4AF37]/20"
                    />
                    <label htmlFor={amenity} className="text-sm text-white cursor-pointer">
                      {t(`search.amenities.${amenity}`)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t("search.sortBy")}
              </Label>
              <Select value={filters.sortBy} onValueChange={(value: any) => setFilters({ ...filters, sortBy: value })}>
                <SelectTrigger className="bg-black border-[#D4AF37]/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-[#D4AF37]/20 text-white">
                  <SelectItem value="date-desc">{t("search.sortBy.dateDesc")}</SelectItem>
                  <SelectItem value="price-asc">{t("search.sortBy.priceAsc")}</SelectItem>
                  <SelectItem value="price-desc">{t("search.sortBy.priceDesc")}</SelectItem>
                  <SelectItem value="surface-asc">{t("search.sortBy.surfaceAsc")}</SelectItem>
                  <SelectItem value="surface-desc">{t("search.sortBy.surfaceDesc")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="bg-black/50 p-4 rounded-lg border border-[#D4AF37]/20">
          <p className="text-[#D4AF37] font-semibold">
            {t("search.results")}: {filteredProperties.length} {t("search.propertiesFound")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={resetFilters}
            variant="outline"
            className="flex-1 border-[#D4AF37]/20 text-white hover:bg-[#D4AF37]/10 bg-black"
          >
            <X className="h-4 w-4 mr-2" />
            {t("search.reset")}
          </Button>
        </div>
      </div>
    </div>
  )
}
