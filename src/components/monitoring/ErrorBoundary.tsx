'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { logger, UserAnalytics } from '@/lib/logger'
import { Button } from '@/components/ui/Button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 记录错误
    logger.error('Error Boundary caught an error', {
      componentStack: errorInfo.componentStack,
      errorBoundary: this.constructor.name,
    }, error)

    // 发送到监控服务
    UserAnalytics.trackError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: this.constructor.name,
    })

    this.setState({
      error,
      errorInfo,
    })
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      // 自定义错误UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // 默认错误UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-2xl mx-auto">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-12 h-12 text-red-400" />
              </div>
              <div className="w-24 h-1 bg-red-400 mx-auto rounded-full"></div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Something went wrong!
            </h1>
            <p className="text-xl text-red-200 mb-8">
              We encountered an unexpected error. Our team has been notified and is working to fix it.
            </p>

            {/* Error Details (Development only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-red-900/50 backdrop-blur-sm rounded-lg p-4 mb-8 text-left">
                <h3 className="text-lg font-semibold mb-2">Error Details:</h3>
                <p className="text-red-200 text-sm font-mono break-all">
                  {this.state.error.message}
                </p>
                {this.state.errorInfo && (
                  <details className="mt-4">
                    <summary className="text-red-300 text-sm cursor-pointer">
                      Component Stack
                    </summary>
                    <pre className="text-red-200 text-xs mt-2 overflow-auto">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                variant="accent" 
                className="flex items-center"
                onClick={this.handleRetry}
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Try Again
              </Button>
              <Link href="/">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-red-600 flex items-center"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Button>
              </Link>
            </div>

            {/* Help Information */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
              <p className="text-red-200 mb-4">
                If this error persists, please contact our support team:
              </p>
              <div className="space-y-2">
                <p>
                  Email:{' '}
                  <a href="mailto:support@lelinksolar.com" className="text-red-400 hover:text-white transition-colors">
                    support@lelinksolar.com
                  </a>
                </p>
                <p>
                  Phone:{' '}
                  <a href="tel:+8613961616296" className="text-red-400 hover:text-white transition-colors">
                    +86 13961616296
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// 高阶组件包装器
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`

  return WrappedComponent
}
