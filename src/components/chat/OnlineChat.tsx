'use client'

import React, { useState, useEffect } from 'react'
import { MessageCircle, X, Phone, Mail, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ChatOption {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  color: string
}

export default function OnlineChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const chatOptions: ChatOption[] = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      action: () => {
        const phoneNumber = '+8613961616296'
        const message = encodeURIComponent('Hello! I am interested in your solar products. Can you help me?')
        window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`, '_blank')
      },
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'phone',
      label: 'Call Now',
      icon: Phone,
      action: () => {
        window.open('tel:+8613961616296', '_self')
      },
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'email',
      label: 'Email Us',
      icon: Mail,
      action: () => {
        window.open('mailto:chris@lelinksolar.com?subject=Inquiry about Solar Products', '_blank')
      },
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ]

  // Auto-open chat after 10 seconds on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('chat-visited')
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem('chat-visited', 'true')
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [])

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-80 h-96'
      }`}>
        {/* Header */}
        <div className="bg-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">Need Help?</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-primary-700 p-1"
            >
              {isMinimized ? '↑' : '↓'}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-primary-700 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Content */}
            <div className="p-4 flex-1">
              <div className="text-center mb-4">
                <p className="text-gray-600 text-sm">
                  Choose how you'd like to get in touch with us
                </p>
              </div>

              <div className="space-y-3">
                {chatOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <Button
                      key={option.id}
                      onClick={option.action}
                      className={`w-full justify-start ${option.color} text-white`}
                      size="lg"
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {option.label}
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </Button>
                  )
                })}
              </div>

              <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 text-center">
                  <strong>Business Hours:</strong> Mon-Fri 9:00-18:00 (GMT+8)<br />
                  <strong>Response Time:</strong> Usually within 2 hours
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-50 rounded-b-lg border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Powered by Lelink Solar
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
