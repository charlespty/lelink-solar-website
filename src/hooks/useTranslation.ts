'use client'

import { useState, useEffect } from 'react'

// 简化的翻译 hook
export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState('en')

  const t = (key: string, fallback?: string) => {
    // 简单的翻译逻辑
    return fallback || key
  }

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang)
  }

  return {
    t,
    currentLanguage,
    changeLanguage
  }
}
