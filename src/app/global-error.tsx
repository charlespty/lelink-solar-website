'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-2xl mx-auto">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="w-24 h-1 bg-red-400 mx-auto rounded-full"></div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Application Error
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              A critical error occurred. Please refresh the page or contact support if the problem persists.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={reset}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="border border-white text-white hover:bg-white hover:text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go Home
              </button>
            </div>

            {/* Help Information */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
              <p className="text-gray-300 mb-4">
                If this error persists, please contact our support team:
              </p>
              <div className="space-y-2">
                <p>
                  Email:{' '}
                  <a href="mailto:support@lelinksolar.com" className="text-blue-400 hover:text-white transition-colors">
                    support@lelinksolar.com
                  </a>
                </p>
                <p>
                  Phone:{' '}
                  <a href="tel:+8613961616296" className="text-blue-400 hover:text-white transition-colors">
                    +86 13961616296
                  </a>
                </p>
              </div>
            </div>

            {/* Error ID for Support */}
            {error.digest && (
              <div className="mt-6 text-gray-400 text-sm">
                <p>Please include this error ID when contacting support:</p>
                <p className="font-mono text-gray-300">{error.digest}</p>
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}
