"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1F1F1F] border-t border-[#D4AF37]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-white text-sm leading-relaxed">
              We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you
              consent to our use of cookies.{" "}
              <Link href="/legal?tab=cookies" className="text-[#D4AF37] hover:underline">
                Learn more
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleReject}
              className="border-[#D4AF37]/20 text-white hover:bg-[#D4AF37]/10 bg-transparent"
            >
              Reject
            </Button>
            <Button onClick={handleAccept} className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90">
              Accept
            </Button>
          </div>
          <button onClick={handleReject} className="text-white hover:text-[#D4AF37] sm:ml-2" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
