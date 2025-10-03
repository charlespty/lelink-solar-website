'use client'

import React, { useEffect, useState } from 'react'

interface PerformanceMetrics {
  loadTime: number
  domContentLoaded: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  firstInputDelay: number
  cumulativeLayoutShift: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 只在开发环境显示性能监控
    if (process.env.NODE_ENV !== 'development') return

    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const paintEntries = performance.getEntriesByType('paint')
      
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
      
      const firstContentfulPaint = paintEntries.find(
        entry => entry.name === 'first-contentful-paint'
      )?.startTime || 0
      
      const largestContentfulPaint = paintEntries.find(
        entry => entry.name === 'largest-contentful-paint'
      )?.startTime || 0

      // 获取 Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            setMetrics(prev => prev ? { ...prev, largestContentfulPaint: entry.startTime } : null)
          }
        }
      })

      observer.observe({ entryTypes: ['largest-contentful-paint'] })

      setMetrics({
        loadTime,
        domContentLoaded,
        firstContentfulPaint,
        largestContentfulPaint,
        firstInputDelay: 0, // 需要用户交互才能测量
        cumulativeLayoutShift: 0, // 需要用户交互才能测量
      })

      setIsVisible(true)
    }

    // 页面加载完成后测量性能
    if (document.readyState === 'complete') {
      measurePerformance()
    } else {
      window.addEventListener('load', measurePerformance)
    }

    return () => {
      window.removeEventListener('load', measurePerformance)
    }
  }, [])

  if (!isVisible || !metrics) return null

  const getPerformanceColor = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return 'text-green-600'
    if (value <= thresholds.poor) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800">性能监控</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span>页面加载时间:</span>
          <span className={getPerformanceColor(metrics.loadTime, { good: 1000, poor: 3000 })}>
            {metrics.loadTime.toFixed(0)}ms
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>DOM 加载时间:</span>
          <span className={getPerformanceColor(metrics.domContentLoaded, { good: 1000, poor: 3000 })}>
            {metrics.domContentLoaded.toFixed(0)}ms
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>首次内容绘制:</span>
          <span className={getPerformanceColor(metrics.firstContentfulPaint, { good: 1500, poor: 3000 })}>
            {metrics.firstContentfulPaint.toFixed(0)}ms
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>最大内容绘制:</span>
          <span className={getPerformanceColor(metrics.largestContentfulPaint, { good: 2500, poor: 4000 })}>
            {metrics.largestContentfulPaint.toFixed(0)}ms
          </span>
        </div>
      </div>
      
      <div className="mt-3 pt-2 border-t border-gray-200">
        <div className="text-xs text-gray-600">
          💡 绿色: 优秀 | 黄色: 需要改进 | 红色: 较差
        </div>
      </div>
    </div>
  )
}