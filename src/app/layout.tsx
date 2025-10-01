import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import { WebsiteStructuredData } from '@/components/seo/StructuredData'
import OnlineChat from '@/components/chat/OnlineChat'
import MonitoringProvider from '@/components/monitoring/MonitoringProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lelink Solar - Power Your Future with Solar Energy',
  description: 'Professional solar generator solutions for homes, businesses, and outdoor adventures. Clean, reliable, and sustainable power wherever you need it.',
  keywords: 'solar generator, portable power, solar energy, backup power, outdoor power, renewable energy',
  authors: [{ name: 'Lelink Solar Team' }],
  creator: 'Lelink Solar',
  publisher: 'Lelink Solar',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lelinksolar.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'zh-CN': '/zh',
      'fr-FR': '/fr',
      'es-ES': '/es',
      'ar-SA': '/ar',
    },
  },
  openGraph: {
    title: 'Lelink Solar - Power Your Future with Solar Energy',
    description: 'Professional solar generator solutions for homes, businesses, and outdoor adventures.',
    url: 'https://lelinksolar.com',
    siteName: 'Lelink Solar',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lelink Solar - Solar Energy Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lelink Solar - Power Your Future with Solar Energy',
    description: 'Professional solar generator solutions for homes, businesses, and outdoor adventures.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <MonitoringProvider>
          {children}
        </MonitoringProvider>
        <GoogleAnalytics />
        <WebsiteStructuredData />
        <OnlineChat />
      </body>
    </html>
  )
}