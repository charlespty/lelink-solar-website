import React from 'react'
import Head from 'next/head'
import Hero from '@/components/sections/Hero'
import ProductShowcase from '@/components/sections/ProductShowcase'
import CustomerReviews from '@/components/sections/CustomerReviews'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Lelink Solar - Power Your Future with Solar Energy</title>
        <meta
          name="description"
          content="Professional solar generator solutions for homes, businesses, and outdoor adventures. Clean, reliable, and sustainable power wherever you need it."
        />
        <meta name="keywords" content="solar generator, portable power, solar energy, backup power, outdoor power" />
        <meta property="og:title" content="Lelink Solar - Power Your Future with Solar Energy" />
        <meta
          property="og:description"
          content="Professional solar generator solutions for homes, businesses, and outdoor adventures."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lelinksolar.com" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lelink Solar - Power Your Future with Solar Energy" />
        <meta
          name="twitter:description"
          content="Professional solar generator solutions for homes, businesses, and outdoor adventures."
        />
        <meta name="twitter:image" content="/images/og-image.jpg" />
        <link rel="canonical" href="https://lelinksolar.com" />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <ProductShowcase />
          <CustomerReviews />
        </main>
        <Footer />
    </div>
    </>
  )
}