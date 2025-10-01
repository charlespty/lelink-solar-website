'use client'

import { useState } from 'react'
import { ChevronDown, Globe } from 'lucide-react'
import { Language, languageConfig } from '@/lib/i18n'

interface LanguageSwitcherProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
  className?: string
}

export function LanguageSwitcher({ 
  currentLanguage, 
  onLanguageChange, 
  className = '' 
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)

  const languages = Object.keys(languageConfig) as Language[]

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>{languageConfig[currentLanguage].flag}</span>
        <span>{languageConfig[currentLanguage].name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    onLanguageChange(lang)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center space-x-3 ${
                    currentLanguage === lang ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{languageConfig[lang].flag}</span>
                  <span>{languageConfig[lang].name}</span>
                  {currentLanguage === lang && (
                    <span className="ml-auto text-blue-600">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// 简化的语言切换器，只显示当前语言
export function SimpleLanguageSwitcher({ 
  currentLanguage, 
  onLanguageChange 
}: {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}) {
  const languages = Object.keys(languageConfig) as Language[]
  const currentIndex = languages.indexOf(currentLanguage)
  const nextLanguage = languages[(currentIndex + 1) % languages.length]

  return (
    <button
      onClick={() => onLanguageChange(nextLanguage)}
      className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      title={`Switch to ${languageConfig[nextLanguage].name}`}
    >
      <span>{languageConfig[currentLanguage].flag}</span>
      <span>{languageConfig[currentLanguage].name}</span>
    </button>
  )
}
