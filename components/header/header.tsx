"use client"

import { HeroCarousel } from "./hero-carousel"
import { Navbar } from "./navbar"

interface HeaderProps {
  isAuthenticated?: boolean
  isAdmin?: boolean
  onLoginClick?: () => void
  onLogout?: () => void
}

export function Header({ isAuthenticated, isAdmin, onLoginClick, onLogout }: HeaderProps) {
  return (
    <header>
      <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} onLoginClick={onLoginClick} onLogout={onLogout} />
      <HeroCarousel />
    </header>
  )
}
