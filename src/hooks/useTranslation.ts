'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { Language, getTranslation, detectUserLanguage, getSupportedLanguages } from '@/lib/i18n'

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  supportedLanguages: Language[]
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const supportedLanguages = getSupportedLanguages()

  useEffect(() => {
    // 检测用户语言偏好
    const userLang = detectUserLanguage()
    setLanguage(userLang)
    
    // 保存到localStorage
    localStorage.setItem('preferred-language', userLang)
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('preferred-language', lang)
    
    // 更新HTML lang属性
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
  }

  const t = (key: string) => getTranslation(key, language)

  return (
    <TranslationContext.Provider value={{
      language,
      setLanguage: handleSetLanguage,
      t,
      supportedLanguages
    }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}

// 简化的翻译Hook，用于不需要Provider的组件
export function useSimpleTranslation(language: Language = 'en') {
  const t = (key: string) => getTranslation(key, language)
  return { t }
}