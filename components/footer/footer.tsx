"use client"

import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"
import { useI18n } from "@/lib/i18n-provider"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-[#1F1F1F] border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#D4AF37] mb-4">Novaterra Lifestyle</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">{t("footer.company.description")}</p>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#D4AF37] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">{t("footer.madrid")}</p>
                  <p>Calle Serrano 45, 28001 Madrid, Spain</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#D4AF37] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">{t("footer.barcelona")}</p>
                  <p>Passeig de Gràcia 100, 08008 Barcelona, Spain</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold text-white mb-4">{t("footer.quicklinks")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("nav.properties")}
                </Link>
              </li>
              <li>
                <Link href="/experiences?type=basic" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("nav.experiences.basic")}
                </Link>
              </li>
              <li>
                <Link href="/experiences?type=vip" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("nav.experiences.vip")}
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("footer.legal")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-bold text-white mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                <a href="tel:+34912345678" className="hover:text-[#D4AF37] transition-colors">
                  +34 91 234 5678
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="h-4 w-4 text-[#D4AF37]" />
                <a href="mailto:info@novaterra-lifestyle.com" className="hover:text-[#D4AF37] transition-colors">
                  info@novaterra-lifestyle.com
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="text-white font-medium mb-2">{t("footer.legal.title")}</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/legal?tab=privacy" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                    {t("footer.privacy")}
                  </Link>
                </li>
                <li>
                  <Link href="/legal?tab=terms" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                    {t("footer.terms")}
                  </Link>
                </li>
                <li>
                  <Link href="/legal?tab=cookies" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                    {t("footer.cookies")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#D4AF37]/20 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Novaterra Lifestyle. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  )
}
