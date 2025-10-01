// 日志系统
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, unknown>
  error?: Error
}

class Logger {
  private level: LogLevel
  private isDevelopment: boolean

  constructor() {
    this.level = process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO
    this.isDevelopment = process.env.NODE_ENV === 'development'
  }

  private formatMessage(entry: LogEntry): string {
    const timestamp = new Date().toISOString()
    const levelName = LogLevel[entry.level]
    const context = entry.context ? ` ${JSON.stringify(entry.context)}` : ''
    const error = entry.error ? `\n${entry.error.stack}` : ''
    
    return `[${timestamp}] ${levelName}: ${entry.message}${context}${error}`
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error) {
    if (level > this.level) return

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
    }

    const formattedMessage = this.formatMessage(entry)

    // 开发环境输出到控制台
    if (this.isDevelopment) {
      switch (level) {
        case LogLevel.ERROR:
          console.error(formattedMessage)
          break
        case LogLevel.WARN:
          console.warn(formattedMessage)
          break
        case LogLevel.INFO:
          console.info(formattedMessage)
          break
        case LogLevel.DEBUG:
          console.debug(formattedMessage)
          break
      }
    }

    // 生产环境发送到监控服务
    if (!this.isDevelopment) {
      this.sendToMonitoring(entry)
    }
  }

  private async sendToMonitoring(entry: LogEntry) {
    try {
      // 这里可以集成 Sentry, LogRocket, 或其他监控服务
      if (entry.level === LogLevel.ERROR && entry.error) {
        // 发送错误到监控服务
        console.error('Sending error to monitoring service:', entry)
      }
    } catch (error) {
      console.error('Failed to send log to monitoring service:', error)
    }
  }

  error(message: string, context?: Record<string, unknown>, error?: Error) {
    this.log(LogLevel.ERROR, message, context, error)
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log(LogLevel.WARN, message, context)
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log(LogLevel.INFO, message, context)
  }

  debug(message: string, context?: Record<string, unknown>) {
    this.log(LogLevel.DEBUG, message, context)
  }
}

export const logger = new Logger()

// 性能监控
export class PerformanceMonitor {
  private static timers: Map<string, number> = new Map()

  static start(label: string) {
    this.timers.set(label, performance.now())
  }

  static end(label: string, context?: Record<string, unknown>) {
    const startTime = this.timers.get(label)
    if (startTime) {
      const duration = performance.now() - startTime
      logger.info(`Performance: ${label}`, { duration, ...context })
      this.timers.delete(label)
      return duration
    }
    return 0
  }

  static measure<T>(label: string, fn: () => T, context?: Record<string, unknown>): T {
    this.start(label)
    try {
      const result = fn()
      this.end(label, context)
      return result
    } catch (error) {
      this.end(label, { ...context, error: true })
      throw error
    }
  }

  static async measureAsync<T>(
    label: string, 
    fn: () => Promise<T>, 
    context?: Record<string, unknown>
  ): Promise<T> {
    this.start(label)
    try {
      const result = await fn()
      this.end(label, context)
      return result
    } catch (error) {
      this.end(label, { ...context, error: true })
      throw error
    }
  }
}

// 用户行为跟踪
export class UserAnalytics {
  static trackPageView(page: string, context?: Record<string, unknown>) {
    logger.info('Page View', { page, ...context })
    
    // 发送到 Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
        page_path: page,
      })
    }
  }

  static trackEvent(action: string, category: string, label?: string, value?: number) {
    logger.info('User Event', { action, category, label, value })
    
    // 发送到 Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      })
    }
  }

  static trackError(error: Error, context?: Record<string, unknown>) {
    logger.error('User Error', context, error)
    
    // 发送到错误监控服务
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      })
    }
  }
}

// 声明 gtag 类型
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}
