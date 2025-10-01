// 监控和分析工具
import { event, trackProductView, trackQuoteRequest, trackCalculatorUse, trackContactForm } from './analytics'

// 错误监控
export class ErrorMonitor {
  private static instance: ErrorMonitor
  private errorCount = 0
  private maxErrors = 10

  static getInstance(): ErrorMonitor {
    if (!ErrorMonitor.instance) {
      ErrorMonitor.instance = new ErrorMonitor()
    }
    return ErrorMonitor.instance
  }

  // 记录错误
  logError(error: Error, context?: string) {
    this.errorCount++
    
    // 发送到控制台
    console.error('Error Monitor:', {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    })

    // 发送到分析服务
    event({
      action: 'error',
      category: 'exception',
      label: `${context || 'Unknown'}: ${error.message}`,
      value: this.errorCount
    })

    // 如果错误过多，发送警告
    if (this.errorCount >= this.maxErrors) {
      this.sendErrorReport()
    }
  }

  // 发送错误报告
  private sendErrorReport() {
    // 这里可以集成 Sentry 或其他错误监控服务
    console.warn('Too many errors detected, sending error report...')
    
    event({
      action: 'error_report',
      category: 'exception',
      label: 'High error rate detected',
      value: this.errorCount
    })
  }

  // 重置错误计数
  reset() {
    this.errorCount = 0
  }
}

// 性能监控
export class PerformanceMonitor {
  private static instance: PerformanceMonitor

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // 监控页面加载性能
  measurePageLoad() {
    if (typeof window === 'undefined') return

    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        if (navigation) {
          const metrics = {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            request: navigation.responseStart - navigation.requestStart,
            response: navigation.responseEnd - navigation.responseStart,
            dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            load: navigation.loadEventEnd - navigation.loadEventStart,
            total: navigation.loadEventEnd - navigation.fetchStart
          }

          // 发送性能数据
          event({
            action: 'page_load',
            category: 'performance',
            label: 'Page Load Time',
            value: Math.round(metrics.total)
          })

          // 检查性能问题
          if (metrics.total > 3000) {
            event({
              action: 'slow_page',
              category: 'performance',
              label: 'Slow page load detected',
              value: Math.round(metrics.total)
            })
          }
        }
      }, 0)
    })
  }

  // 监控用户交互
  measureUserInteraction(element: string, action: string) {
    const startTime = performance.now()
    
    return () => {
      const duration = performance.now() - startTime
      
      event({
        action: 'interaction',
        category: 'user_engagement',
        label: `${element} - ${action}`,
        value: Math.round(duration)
      })
    }
  }
}

// 用户行为分析
export class UserAnalytics {
  private static instance: UserAnalytics
  private sessionStart = Date.now()
  private pageViews = 0
  private interactions = 0

  static getInstance(): UserAnalytics {
    if (!UserAnalytics.instance) {
      UserAnalytics.instance = new UserAnalytics()
    }
    return UserAnalytics.instance
  }

  // 记录页面浏览
  trackPageView(page: string) {
    this.pageViews++
    
    event({
      action: 'page_view',
      category: 'navigation',
      label: page,
      value: this.pageViews
    })
  }

  // 记录用户交互
  trackInteraction(type: string, target: string) {
    this.interactions++
    
    event({
      action: 'interaction',
      category: 'user_engagement',
      label: `${type} - ${target}`,
      value: this.interactions
    })
  }

  // 记录会话结束
  trackSessionEnd() {
    const sessionDuration = Date.now() - this.sessionStart
    
    event({
      action: 'session_end',
      category: 'user_engagement',
      label: 'Session Duration',
      value: Math.round(sessionDuration / 1000) // 转换为秒
    })
  }

  // 记录产品相关行为
  trackProductBehavior(action: string, productId: string, productName: string) {
    switch (action) {
      case 'view':
        trackProductView(productId, productName)
        break
      case 'quote':
        trackQuoteRequest(productId)
        break
      default:
        event({
          action: `product_${action}`,
          category: 'ecommerce',
          label: `${productId} - ${productName}`
        })
    }
  }

  // 记录计算器使用
  trackCalculatorUsage(powerOutput: number) {
    trackCalculatorUse(powerOutput)
  }

  // 记录表单提交
  trackFormSubmission(formType: string) {
    trackContactForm(formType)
  }
}

// 初始化监控
export function initializeMonitoring() {
  if (typeof window === 'undefined') return

  const errorMonitor = ErrorMonitor.getInstance()
  const performanceMonitor = PerformanceMonitor.getInstance()
  const userAnalytics = UserAnalytics.getInstance()

  // 设置全局错误处理
  window.addEventListener('error', (e) => {
    errorMonitor.logError(e.error, 'Global Error')
  })

  window.addEventListener('unhandledrejection', (e) => {
    errorMonitor.logError(new Error(e.reason), 'Unhandled Promise Rejection')
  })

  // 开始性能监控
  performanceMonitor.measurePageLoad()

  // 记录会话结束
  window.addEventListener('beforeunload', () => {
    userAnalytics.trackSessionEnd()
  })

  return {
    errorMonitor,
    performanceMonitor,
    userAnalytics
  }
}

// 导出单例实例
export const errorMonitor = ErrorMonitor.getInstance()
export const performanceMonitor = PerformanceMonitor.getInstance()
export const userAnalytics = UserAnalytics.getInstance()
