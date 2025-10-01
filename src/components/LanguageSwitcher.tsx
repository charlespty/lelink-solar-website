'use client'

import React from 'react'

interface LanguageSwitcherProps {
  currentLanguage: string
  onLanguageChange: (lang: string) => void
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-1">
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-3 py-1 rounded text-sm transition-colors ${
          currentLanguage === 'en' 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-300 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onLanguageChange('zh')}
        className={`px-3 py-1 rounded text-sm transition-colors ${
          currentLanguage === 'zh' 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-300 hover:text-white'
        }`}
      >
        中文
      </button>
    </div>
  )
}
