'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-dark-900 flex items-center justify-center px-4">
      <div className="text-center text-white max-w-2xl mx-auto">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-primary-200 mb-4">404</div>
          <div className="w-24 h-1 bg-primary-400 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-primary-200 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/">
            <Button size="lg" variant="accent" className="flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </Link>
          <button 
            className="inline-flex items-center px-6 py-3 border border-white text-white hover:bg-white hover:text-primary-600 rounded-lg transition-colors"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Search Suggestion */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Looking for something specific?</h3>
          <p className="text-primary-200 mb-4">
            Try searching for our products or visit our main pages:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/products" className="text-primary-300 hover:text-white transition-colors">
              Products
            </Link>
            <span className="text-primary-400">•</span>
            <Link href="/calculator" className="text-primary-300 hover:text-white transition-colors">
              Power Calculator
            </Link>
            <span className="text-primary-400">•</span>
            <Link href="/about" className="text-primary-300 hover:text-white transition-colors">
              About Us
            </Link>
            <span className="text-primary-400">•</span>
            <Link href="/support/faq" className="text-primary-300 hover:text-white transition-colors">
              FAQ
            </Link>
            <span className="text-primary-400">•</span>
            <Link href="/contact" className="text-primary-300 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-primary-300">
          <p>Still can't find what you're looking for?</p>
          <p>Contact our support team at{' '}
            <a href="mailto:support@lelinksolar.com" className="text-primary-400 hover:text-white transition-colors">
              support@lelinksolar.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
