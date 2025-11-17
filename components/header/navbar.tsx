"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, LogIn, User, Heart, Eye, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useI18n } from "@/lib/i18n-provider"
import { locales } from "@/lib/i18n-config"

interface NavbarProps {
  isAuthenticated?: boolean
  isAdmin?: boolean
  onLoginClick?: () => void
  onLogout?: () => void
}

export function Navbar({ isAuthenticated = false, isAdmin = false, onLoginClick, onLogout }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t, locale, setLocale } = useI18n()

  const currentLocale = locales.find((l) => l.code === locale) || locales[0]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-[#D4AF37]/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-[#D4AF37] font-serif text-2xl font-bold">Novaterra Lifestyle</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-white hover:text-[#D4AF37] transition-colors font-medium">
              {t("nav.home")}
            </Link>
            <Link href="/properties" className="text-white hover:text-[#D4AF37] transition-colors font-medium">
              {t("nav.properties")}
            </Link>
            <Link href="/services" className="text-white hover:text-[#D4AF37] transition-colors font-medium">
              {t("nav.services")}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-white hover:text-[#D4AF37] transition-colors font-medium">
                {t("nav.experiences")}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border-[#D4AF37]/20">
                <DropdownMenuItem asChild>
                  <Link href="/experiences?type=basic" className="text-white hover:text-[#D4AF37]">
                    {t("nav.experiences.basic")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/experiences?type=vip" className="text-white hover:text-[#D4AF37]">
                    {t("nav.experiences.vip")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* User Menu */}
            {isAuthenticated ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-white hover:text-[#D4AF37] hover:bg-[#D4AF37]/10">
                      <User className="h-5 w-5 mr-2" />
                      {t("nav.panel")}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black border-[#D4AF37]/20">
                    <DropdownMenuItem asChild>
                      <Link href="/visited" className="text-white hover:text-[#D4AF37] cursor-pointer">
                        <Eye className="h-4 w-4 mr-2" />
                        {t("nav.visited")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/favorites" className="text-white hover:text-[#D4AF37] cursor-pointer">
                        <Heart className="h-4 w-4 mr-2" />
                        {t("nav.favorites")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="text-white hover:text-[#D4AF37] cursor-pointer">
                        <User className="h-4 w-4 mr-2" />
                        {t("nav.profile")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#D4AF37]/20" />
                    <DropdownMenuItem onClick={onLogout} className="text-white hover:text-[#D4AF37] cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" />
                      {t("nav.logout")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {isAdmin && (
                  <Link href="/admin">
                    <Button className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90">
                      <Settings className="h-4 w-4 mr-2" />
                      {t("nav.admin")}
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <Button onClick={onLoginClick} className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90">
                <LogIn className="h-4 w-4 mr-2" />
                {t("nav.login")}
              </Button>
            )}

            {/* Language Selector - positioned at the far right */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-white hover:text-[#D4AF37] transition-colors">
                <span>{currentLocale.flag}</span>
                <span className="text-sm">{currentLocale.name}</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border-[#D4AF37]/20">
                {locales.map((loc) => (
                  <DropdownMenuItem
                    key={loc.code}
                    onClick={() => setLocale(loc.code)}
                    className="text-white hover:text-[#D4AF37] cursor-pointer"
                  >
                    <span className="mr-2">{loc.flag}</span>
                    {loc.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1F1F1F] border-t border-[#D4AF37]/20">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block text-white hover:text-[#D4AF37] py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/properties"
              className="block text-white hover:text-[#D4AF37] py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.properties")}
            </Link>
            <Link
              href="/services"
              className="block text-white hover:text-[#D4AF37] py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.services")}
            </Link>
            <Link
              href="/experiences?type=basic"
              className="block text-white hover:text-[#D4AF37] py-2 pl-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.experiences.basic")}
            </Link>
            <Link
              href="/experiences?type=vip"
              className="block text-white hover:text-[#D4AF37] py-2 pl-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.experiences.vip")}
            </Link>

            {isAuthenticated ? (
              <>
                <div className="border-t border-[#D4AF37]/20 pt-3 mt-3">
                  <Link
                    href="/visited"
                    className="block text-white hover:text-[#D4AF37] py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("nav.visited")}
                  </Link>
                  <Link
                    href="/favorites"
                    className="block text-white hover:text-[#D4AF37] py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("nav.favorites")}
                  </Link>
                  <Link
                    href="/profile"
                    className="block text-white hover:text-[#D4AF37] py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("nav.profile")}
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="block text-white hover:text-[#D4AF37] py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t("nav.admin")}
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      onLogout?.()
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-left text-white hover:text-[#D4AF37] py-2"
                  >
                    {t("nav.logout")}
                  </button>
                </div>
              </>
            ) : (
              <Button
                onClick={() => {
                  onLoginClick?.()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90"
              >
                {t("nav.login")}
              </Button>
            )}

            {/* Mobile Language Selector */}
            <div className="border-t border-[#D4AF37]/20 pt-3 mt-3">
              <div className="text-[#D4AF37] text-sm font-medium mb-2">Language / Idioma</div>
              <div className="grid grid-cols-3 gap-2">
                {locales.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => {
                      setLocale(loc.code)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`text-sm py-2 px-3 rounded ${
                      locale === loc.code
                        ? "bg-[#D4AF37] text-black"
                        : "bg-[#1F1F1F] text-white border border-[#D4AF37]/20"
                    }`}
                  >
                    {loc.flag} {loc.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
