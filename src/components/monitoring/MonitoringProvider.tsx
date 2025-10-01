'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initializeMonitoring, userAnalytics } from '@/lib/monitoring'

export default function MonitoringProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // 初始化监控系统
    initializeMonitoring()
  }, [])

  useEffect(() => {
    // 跟踪页面浏览
    if (pathname) {
      userAnalytics.trackPageView(pathname)
    }
  }, [pathname])

  return <>{children}</>
}
