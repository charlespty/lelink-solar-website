'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { getImagePath } from '@/lib/imageUtils'

const navigation = [
  {
    name: 'Home',
    nameEn: 'Home',
    nameZh: '首页',
    nameFr: 'Accueil',
    nameEs: 'Inicio',
    nameAr: 'الرئيسية',
    href: '/',
  },
  {
    name: 'Products',
    nameEn: 'Products',
    nameZh: '产品',
    nameFr: 'Produits',
    nameEs: 'Productos',
    nameAr: 'المنتجات',
    href: '/products',
    children: [
      {
        name: 'LK Solar Generator',
        nameEn: 'LK Solar Generator',
        nameZh: 'LK 太阳能发电机',
        nameFr: 'Générateur Solaire LK',
        nameEs: 'Generador Solar LK',
        nameAr: 'مولد الطاقة الشمسية LK',
        href: '/products/lk-solar-generator-lk-2000',
      },
      {
        name: 'LP Foldable Solar Panel',
        nameEn: 'LP Foldable Solar Panel',
        nameZh: 'LP 折叠太阳能面板',
        nameFr: 'Panneau Solaire Pliable LP',
        nameEs: 'Panel Solar Plegable LP',
        nameAr: 'لوحة شمسية قابلة للطي LP',
        href: '/products/lp-400w-solar-panel',
      },
      {
        name: 'LT Fixed Solar Panel',
        nameEn: 'LT Fixed Solar Panel',
        nameZh: 'LT 固定式太阳能面板',
        nameFr: 'Panneau Solaire Fixe LT',
        nameEs: 'Panel Solar Fijo LT',
        nameAr: 'لوحة شمسية ثابتة LT',
        href: '/products/lt-fixed-solar-panel',
      },
    ],
  },
  {
    name: 'Calculator',
    nameEn: 'Power Calculator',
    nameZh: '功率计算器',
    nameFr: 'Calculateur de Puissance',
    nameEs: 'Calculadora de Potencia',
    nameAr: 'حاسبة الطاقة',
    href: '/calculator',
  },
  {
    name: 'About',
    nameEn: 'About Us',
    nameZh: '关于我们',
    nameFr: 'À Propos',
    nameEs: 'Acerca de Nosotros',
    nameAr: 'معلومات عنا',
    href: '/about',
  },
  {
    name: 'Support',
    nameEn: 'Support',
    nameZh: '支持',
    nameFr: 'Support',
    nameEs: 'Soporte',
    nameAr: 'الدعم',
    href: '/support/faq',
  },
  {
    name: 'Contact',
    nameEn: 'Contact',
    nameZh: '联系我们',
    nameFr: 'Contact',
    nameEs: 'Contacto',
    nameAr: 'اتصل بنا',
    href: '/contact',
  },
]

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')

  const getLocalizedName = (item: { nameEn: string; nameZh: string; nameFr: string; nameEs: string; nameAr: string }) => {
    switch (currentLanguage) {
      case 'zh':
        return item.nameZh || item.nameEn
      case 'fr':
        return item.nameFr || item.nameEn
      case 'es':
        return item.nameEs || item.nameEn
      case 'ar':
        return item.nameAr || item.nameEn
      default:
        return item.nameEn
    }
  }

  const changeLanguage = (locale: string) => {
    setCurrentLanguage(locale)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-4">
              <Image
                src={getImagePath("/images/logo.png")}
                alt="Lelink Solar"
                width={120}
                height={120}
                className="h-20 w-auto"
              />
              <span className="text-3xl font-bold text-dark-900">
                Lelink Solar
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center text-sm font-medium text-dark-700 hover:text-primary-800 transition-colors"
                >
                  {getLocalizedName(item)}
                  {item.children && (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                {item.children && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-dark-700 hover:bg-primary-50 hover:text-primary-800 transition-colors"
                        >
                          {getLocalizedName(child)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center space-x-4">
            {/* CTA Button */}
            <Button variant="accent" size="sm">
              Get Quote
            </Button>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-dark-700 hover:text-primary-800 hover:bg-primary-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-dark-700 hover:text-primary-800 hover:bg-primary-50 rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {getLocalizedName(item)}
                  </Link>
                  {item.children && (
                    <div className="pl-6 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-dark-600 hover:text-primary-800 hover:bg-primary-50 rounded-md transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {getLocalizedName(child)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
