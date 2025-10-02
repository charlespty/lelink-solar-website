'use client'

import { useEffect } from 'react'

export const PerformanceMonitor = () => {
  useEffect(() => {
    // 监控页面加载性能
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming
            console.log('页面加载性能:', {
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
              loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
              totalTime: navEntry.loadEventEnd - navEntry.fetchStart,
            })
          }
        }
      })

      observer.observe({ entryTypes: ['navigation'] })

      // 监控资源加载
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming
            if (resourceEntry.duration > 1000) { // 超过1秒的资源
              console.warn('慢资源:', {
                name: resourceEntry.name,
                duration: resourceEntry.duration,
                size: resourceEntry.transferSize,
              })
            }
          }
        }
      })

      resourceObserver.observe({ entryTypes: ['resource'] })

      return () => {
        observer.disconnect()
        resourceObserver.disconnect()
      }
    }
  }, [])

  return null
}
