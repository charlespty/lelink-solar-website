'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserAnalytics } from '@/lib/logger'

export function useAnalytics() {
  const router = useRouter()

  useEffect(() => {
    // 跟踪页面访问
    const handleRouteChange = (url: string) => {
      UserAnalytics.trackPageView(url)
    }

    // 监听路由变化
    const originalPush = router.push
    const originalReplace = router.replace

    router.push = (href: string) => {
      handleRouteChange(href)
      return originalPush.call(router, href)
    }

    router.replace = (href: string) => {
      handleRouteChange(href)
      return originalReplace.call(router, href)
    }

    // 初始页面访问
    if (typeof window !== 'undefined') {
      UserAnalytics.trackPageView(window.location.pathname)
    }

    return () => {
      router.push = originalPush
      router.replace = originalReplace
    }
  }, [router])

  return {
    trackEvent: UserAnalytics.trackEvent,
    trackError: UserAnalytics.trackError,
  }
}

// 错误边界Hook
export function useErrorTracking() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      UserAnalytics.trackError(new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      })
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      UserAnalytics.trackError(
        new Error(event.reason?.message || 'Unhandled Promise Rejection'),
        { reason: event.reason }
      )
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])
}
