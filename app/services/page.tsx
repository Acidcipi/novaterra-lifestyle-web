"use client"

import { useState } from "react"
import { Header } from "@/components/header/header"
import { Footer } from "@/components/footer/footer"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-provider"
import { LoginModal } from "@/components/auth/login-modal"
import { RegisterModal } from "@/components/auth/register-modal"
import { Plane, Car, Hotel, Clock, Users } from 'lucide-react'
import { isAdmin } from "@/lib/auth-helpers"

const transportRentals = [
  {
    id: "t1",
    name: "Mercedes-Benz S-Class",
    image: "/luxury-mercedes-s-class-black.jpg",
    price: 250,
    priceUnit: "hour",
    capacity: 4,
    hours: "24/7 Available",
    description: "Executive sedan with professional chauffeur",
  },
  {
    id: "t2",
    name: "Rolls-Royce Phantom",
    image: "/rolls-royce-phantom-luxury.jpg",
    price: 500,
    priceUnit: "hour",
    capacity: 4,
    hours: "24/7 Available",
    description: "Ultimate luxury limousine experience",
  },
  {
    id: "t3",
    name: "Ferrari 488 Spider",
    image: "/ferrari-488-spider-red.jpg",
    price: 800,
    priceUnit: "hour",
    capacity: 2,
    hours: "By appointment",
    description: "Exotic sports car rental",
  },
  {
    id: "t4",
    name: "Private Helicopter",
    image: "/luxury-private-helicopter.jpg",
    price: 2500,
    priceUnit: "hour",
    capacity: 6,
    hours: "Advance booking required",
    description: "Aerial transportation with pilot",
  },
  {
    id: "t5",
    name: "Luxury Yacht",
    image: "/luxury-yacht-mediterranean.png",
    price: 5000,
    priceUnit: "day",
    capacity: 12,
    hours: "Weekly charters available",
    description: "Mediterranean cruise with crew",
  },
  {
    id: "t6",
    name: "Bentley Continental GT",
    image: "/bentley-continental-gt-luxury.jpg",
    price: 400,
    priceUnit: "hour",
    capacity: 4,
    hours: "24/7 Available",
    description: "Grand touring luxury coupe",
  },
]

export default function ServicesPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [activeService, setActiveService] = useState<"transport" | "flights" | "hotels">("transport")
  const { user, logout } = useAuth()
  const { t } = useI18n()

  return (
    <main className="min-h-screen bg-black">
      <Header
        isAuthenticated={!!user}
        isAdmin={isAdmin(user)}
        onLoginClick={() => setShowLogin(true)}
        onLogout={logout}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <h1 className="text-4xl font-serif font-bold text-[#D4AF37] mb-4">{t("services.title")}</h1>
        <p className="text-gray-400 mb-8">{t("services.description")}</p>

        <div className="flex gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveService("transport")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeService === "transport"
                ? "bg-[#D4AF37] text-black"
                : "bg-[#1F1F1F] text-white border border-[#D4AF37]/20 hover:border-[#D4AF37]/40"
            }`}
          >
            <Car className="h-5 w-5" />
            {t("services.transport")}
          </button>
          <button
            onClick={() => setActiveService("flights")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeService === "flights"
                ? "bg-[#D4AF37] text-black"
                : "bg-[#1F1F1F] text-white border border-[#D4AF37]/20 hover:border-[#D4AF37]/40"
            }`}
          >
            <Plane className="h-5 w-5" />
            {t("services.flights")}
          </button>
          <button
            onClick={() => setActiveService("hotels")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeService === "hotels"
                ? "bg-[#D4AF37] text-black"
                : "bg-[#1F1F1F] text-white border border-[#D4AF37]/20 hover:border-[#D4AF37]/40"
            }`}
          >
            <Hotel className="h-5 w-5" />
            {t("services.hotels")}
          </button>
        </div>

        <div className="bg-[#1F1F1F] border border-[#D4AF37]/20 rounded-lg p-8">
          {activeService === "transport" && (
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">{t("services.transport.title")}</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">{t("services.transport.description")}</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {transportRentals.map((rental) => (
                  <div key={rental.id} className="bg-black rounded-lg border border-[#D4AF37]/10 overflow-hidden">
                    <img
                      src={rental.image || "/placeholder.svg"}
                      alt={rental.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-[#D4AF37] font-bold text-lg mb-2">{rental.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{rental.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            Capacity
                          </span>
                          <span className="text-white">{rental.capacity} guests</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Hours
                          </span>
                          <span className="text-white">{rental.hours}</span>
                        </div>
                      </div>
                      <div className="flex items-end justify-between pt-4 border-t border-[#D4AF37]/10">
                        <div>
                          <span className="text-2xl font-bold text-[#D4AF37]">€{rental.price}</span>
                          <span className="text-gray-400 text-sm">/{rental.priceUnit}</span>
                        </div>
                        <button className="bg-[#D4AF37] text-black px-4 py-2 rounded font-medium text-sm hover:bg-[#D4AF37]/90 transition-colors">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeService === "flights" && (
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">{t("services.flights.title")}</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">{t("services.flights.description")}</p>

              <div className="bg-black rounded-lg p-6 border border-[#D4AF37]/10 mb-6">
                <h3 className="text-white font-bold text-lg mb-4">Search Private Flights</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">From</label>
                    <input
                      type="text"
                      placeholder="Departure city"
                      className="w-full bg-[#1F1F1F] border border-[#D4AF37]/20 text-white rounded px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">To</label>
                    <input
                      type="text"
                      placeholder="Destination"
                      className="w-full bg-[#1F1F1F] border border-[#D4AF37]/20 text-white rounded px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Date</label>
                    <input
                      type="date"
                      className="w-full bg-[#1F1F1F] border border-[#D4AF37]/20 text-white rounded px-4 py-2"
                    />
                  </div>
                  <div className="flex items-end">
                    <button className="w-full bg-[#D4AF37] text-black px-6 py-2 rounded font-medium hover:bg-[#D4AF37]/90 transition-colors">
                      Search Flights
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-black rounded-lg p-6 border border-[#D4AF37]/10 flex gap-6">
                  <img src="/private-jet-exterior.jpg" alt="Private Jet" className="w-48 h-32 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="text-[#D4AF37] font-bold mb-2">Light Jet - Citation CJ3</h4>
                    <p className="text-gray-400 text-sm mb-3">Capacity: 6-7 passengers | Range: 2,000 nm</p>
                    <p className="text-gray-300 text-sm">
                      Perfect for short to medium-haul flights with luxury amenities.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="mb-2">
                      <span className="text-2xl font-bold text-[#D4AF37]">€8,500</span>
                      <span className="text-gray-400 text-sm">/hour</span>
                    </div>
                    <button className="bg-[#D4AF37] text-black px-6 py-2 rounded font-medium hover:bg-[#D4AF37]/90 transition-colors">
                      Book
                    </button>
                  </div>
                </div>

                <div className="bg-black rounded-lg p-6 border border-[#D4AF37]/10 flex gap-6">
                  <img src="/large-private-jet.jpg" alt="Large Jet" className="w-48 h-32 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="text-[#D4AF37] font-bold mb-2">Heavy Jet - Gulfstream G650</h4>
                    <p className="text-gray-400 text-sm mb-3">Capacity: 14-16 passengers | Range: 7,500 nm</p>
                    <p className="text-gray-300 text-sm">
                      Ultra long-range capability with full bedroom and premium entertainment.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="mb-2">
                      <span className="text-2xl font-bold text-[#D4AF37]">€15,000</span>
                      <span className="text-gray-400 text-sm">/hour</span>
                    </div>
                    <button className="bg-[#D4AF37] text-black px-6 py-2 rounded font-medium hover:bg-[#D4AF37]/90 transition-colors">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeService === "hotels" && (
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">{t("services.hotels.title")}</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">{t("services.hotels.description")}</p>

              <div className="bg-black rounded-lg p-6 border border-[#D4AF37]/10 mb-6">
                <h3 className="text-white font-bold text-lg mb-4">Search Luxury Hotels</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Destination</label>
                    <input
                      type="text"
                      placeholder="City or hotel name"
                      className="w-full bg-[#1F1F1F] border border-[#D4AF37]/20 text-white rounded px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Check-in</label>
                    <input
                      type="date"
                      className="w-full bg-[#1F1F1F] border border-[#D4AF37]/20 text-white rounded px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Check-out</label>
                    <input
                      type="date"
                      className="w-full bg-[#1F1F1F] border border-[#D4AF37]/20 text-white rounded px-4 py-2"
                    />
                  </div>
                  <div className="flex items-end">
                    <button className="w-full bg-[#D4AF37] text-black px-6 py-2 rounded font-medium hover:bg-[#D4AF37]/90 transition-colors">
                      Search Hotels
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black rounded-lg border border-[#D4AF37]/10 overflow-hidden">
                  <img src="/luxury-hotel-suite-gold-interior.jpg" alt="Presidential Suite" className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-[#D4AF37] font-bold text-lg">Hotel Arts Barcelona</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-[#D4AF37]">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Presidential Suite | Barcelona, Spain</p>
                    <p className="text-gray-300 text-sm mb-4">
                      Beachfront luxury with stunning city and sea views. Michelin-starred dining.
                    </p>
                    <div className="flex items-end justify-between pt-4 border-t border-[#D4AF37]/10">
                      <div>
                        <span className="text-2xl font-bold text-[#D4AF37]">€1,200</span>
                        <span className="text-gray-400 text-sm">/night</span>
                      </div>
                      <button className="bg-[#D4AF37] text-black px-6 py-2 rounded font-medium hover:bg-[#D4AF37]/90 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-black rounded-lg border border-[#D4AF37]/10 overflow-hidden">
                  <img src="/luxury-beach-resort-pool.jpg" alt="Beach Resort" className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-[#D4AF37] font-bold text-lg">Puente Romano Marbella</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-[#D4AF37]">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Royal Suite | Marbella, Spain</p>
                    <p className="text-gray-300 text-sm mb-4">
                      Exclusive resort on Golden Mile. Private beach club and world-class spa.
                    </p>
                    <div className="flex items-end justify-between pt-4 border-t border-[#D4AF37]/10">
                      <div>
                        <span className="text-2xl font-bold text-[#D4AF37]">€2,500</span>
                        <span className="text-gray-400 text-sm">/night</span>
                      </div>
                      <button className="bg-[#D4AF37] text-black px-6 py-2 rounded font-medium hover:bg-[#D4AF37]/90 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-black rounded-lg border border-[#D4AF37]/10 overflow-hidden">
                  <img src="/luxury-boutique-hotel-lobby.jpg" alt="Boutique Hotel" className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-[#D4AF37] font-bold text-lg">Cap Rocat Mallorca</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-[#D4AF37]">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Exclusive Suite | Mallorca, Spain</p>
                    <p className="text-gray-300 text-sm mb-4">
                      Historic fortress converted into intimate luxury resort. Breathtaking bay views.
                    </p>
                    <div className="flex items-end justify-between pt-4 border-t border-[#D4AF37]/10">
                      <div>
                        <span className="text-2xl font-bold text-[#D4AF37]">€950</span>
                        <span className="text-gray-400 text-sm">/night</span>
                      </div>
                      <button className="bg-[#D4AF37] text-black px-6 py-2 rounded font-medium hover:bg-[#D4AF37]/90 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-black rounded-lg border border-[#D4AF37]/10 overflow-hidden">
                  <img src="/luxury-city-hotel-penthouse.jpg" alt="City Hotel" className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-[#D4AF37] font-bold text-lg">Gran Meliá Palacio</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-[#D4AF37]">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Penthouse Suite | Madrid, Spain</p>
                    <p className="text-gray-300 text-sm mb-4">
                      Belle Époque palace in heart of Madrid. Rooftop terrace with city panoramas.
                    </p>
                    <div className="flex items-end justify-between pt-4 border-t border-[#D4AF37]/10">
                      <div>
                        <span className="text-2xl font-bold text-[#D4AF37]">€850</span>
                        <span className="text-gray-400 text-sm">/night</span>
                      </div>
                      <button className="bg-[#D4AF37] text-black px-6 py-2 rounded font-medium hover:bg-[#D4AF37]/90 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
