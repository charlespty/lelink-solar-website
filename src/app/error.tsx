'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

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
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-900/50 backdrop-blur-sm rounded-lg p-4 mb-8 text-left">
            <h3 className="text-lg font-semibold mb-2">Error Details:</h3>
            <p className="text-red-200 text-sm font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-red-300 text-xs mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            size="lg" 
            variant="accent" 
            className="flex items-center"
            onClick={reset}
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

        {/* Error ID for Support */}
        {error.digest && (
          <div className="mt-6 text-red-300 text-sm">
            <p>Please include this error ID when contacting support:</p>
            <p className="font-mono text-red-400">{error.digest}</p>
          </div>
        )}
      </div>
    </div>
  )
}
