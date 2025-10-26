'use client'

import React, { useState, useEffect } from 'react'

interface PerformanceMetrics {
  firstContentfulPaint: number
  largestContentfulPaint: number
  firstInputDelay: number
  cumulativeLayoutShift: number
  timeToInteractive: number
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const measurePerformance = () => {
      // 等待性能指标可用
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const paintEntries = performance.getEntriesByType('paint')
        
        const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
        const largestContentfulPaint = paintEntries.find(entry => entry.name === 'largest-contentful-paint')?.startTime || 0
        
        // 模拟其他指标（实际应用中需要更复杂的测量）
        const performanceData: PerformanceMetrics = {
          firstContentfulPaint,
          largestContentfulPaint,
          firstInputDelay: 0, // 需要用户交互才能测量
          cumulativeLayoutShift: 0, // 需要用户交互才能测量
          timeToInteractive: navigation.loadEventEnd - navigation.fetchStart
        }

        setMetrics(performanceData)
        setIsVisible(true)
      }, 1000)
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

  const formatTime = (ms: number) => {
    return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(1)}s`
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800">性能监控</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 text-xs"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">首次内容绘制:</span>
          <span className={getPerformanceColor(metrics.firstContentfulPaint, { good: 1800, poor: 3000 })}>
            {formatTime(metrics.firstContentfulPaint)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">最大内容绘制:</span>
          <span className={getPerformanceColor(metrics.largestContentfulPaint, { good: 2500, poor: 4000 })}>
            {formatTime(metrics.largestContentfulPaint)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">可交互时间:</span>
          <span className={getPerformanceColor(metrics.timeToInteractive, { good: 3800, poor: 7300 })}>
            {formatTime(metrics.timeToInteractive)}
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