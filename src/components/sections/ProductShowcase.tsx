'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  Home, 
  Tent, 
  Shield, 
  Building2, 
  Zap, 
  Sun, 
  Battery,
  ArrowRight,
  CheckCircle,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

import { getAllProducts } from '@/lib/productsData'
import { getImagePath } from '@/lib/imageUtils'

const products = getAllProducts()
const coreProduct = products[0] // LK Solar Generator

const applicationScenarios = [
  {
    id: 'home',
    icon: Home,
    title: 'Home Energy Solutions',
    titleZh: '家庭能源解决方案',
    description: 'Reliable backup power for your home during outages.',
    descriptionZh: '为您的家庭提供停电期间的可靠备用电源。',
    useCases: [
      { text: 'Essential appliances', textZh: '重要电器' },
      { text: 'Emergency lighting', textZh: '应急照明' }
    ],
    image: getImagePath('/images/Scenarios/home-scenario.png'),
    benefits: [
      { text: '24/7 Backup', textZh: '24/7 备用' },
      { text: 'Silent Operation', textZh: '静音运行' }
    ]
  },
  {
    id: 'outdoor',
    icon: Tent,
    title: 'Outdoor Adventures',
    titleZh: '户外探险',
    description: 'Perfect companion for camping and outdoor activities.',
    descriptionZh: '露营和户外活动的完美伴侣。',
    useCases: [
      { text: 'Camping power', textZh: '露营用电' },
      { text: 'RV and van life', textZh: '房车生活' }
    ],
    image: getImagePath('/images/Scenarios/outdoor-scenario.png'),
    benefits: [
      { text: 'Ultra-Portable', textZh: '超便携' },
      { text: 'Weather Resistant', textZh: '防风雨' }
    ]
  }
]

export default function ProductShowcase() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'zh'>('en')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const getLocalizedText = (en: string, zh: string) => {
    return currentLanguage === 'en' ? en : zh
  }

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % coreProduct.images.length
      )
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % coreProduct.images.length
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? coreProduct.images.length - 1 : prevIndex - 1
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Core Product Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            {getLocalizedText('Our Core Product', '我们的核心产品')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            {getLocalizedText(
              'One powerful solution, countless applications. Our LE Solar Generator Series adapts to your needs.',
              '一个强大的解决方案，无数种应用。我们的LE太阳能发电机系列适应您的需求。'
            )}
          </p>
        </motion.div>

        {/* Core Product Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Product Image Carousel */}
              <div className="relative">
                <div className="relative h-80 bg-transparent rounded-lg overflow-hidden">
                  <Image
                    src={coreProduct.images[currentImageIndex]}
                    alt={getLocalizedText(coreProduct.name, coreProduct.nameZh)}
                    fill
                    className="object-contain transition-opacity duration-500"
                  />
                  
                  {/* Carousel Navigation */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Carousel Indicators */}
                <div className="flex justify-center space-x-2 mt-4">
                  {coreProduct.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-blue-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {getLocalizedText(coreProduct.name, coreProduct.nameZh)}
                </h3>
                <p className="text-gray-300 mb-6">
                  {getLocalizedText(coreProduct.description, coreProduct.descriptionZh)}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {coreProduct.keyFeatures.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-blue-400" />
                        <span className="text-gray-300 text-sm">
                          {getLocalizedText(feature.text, feature.textZh)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Application Scenarios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            {getLocalizedText('Application Scenarios', '应用场景')}
          </h3>
          <p className="text-lg text-gray-300">
            {getLocalizedText(
              'Discover how our solar generator powers your life in different situations.',
              '了解我们的太阳能发电机如何在不同情况下为您的生活提供动力。'
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {applicationScenarios.map((scenario, index) => {
            const Icon = scenario.icon
            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="relative border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 overflow-hidden"
                  style={{
                    backgroundImage: `url(${scenario.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="relative p-6 h-full flex flex-col">
                    {/* Icon at top */}
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-blue-600/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-blue-400" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          {getLocalizedText(scenario.title, scenario.titleZh)}
                        </h3>
                        <p className="text-gray-200 text-sm mb-4">
                          {getLocalizedText(scenario.description, scenario.descriptionZh)}
                        </p>
                        
                        <div className="space-y-2 mb-4">
                          {scenario.useCases.map((useCase, useCaseIndex) => (
                            <div key={useCaseIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-green-400" />
                              <span className="text-gray-200 text-xs">
                                {getLocalizedText(useCase.text, useCase.textZh)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {scenario.benefits.map((benefit, benefitIndex) => (
                          <span
                            key={benefitIndex}
                            className="px-3 py-1 bg-blue-600/30 text-blue-200 text-xs rounded-full backdrop-blur-sm"
                          >
                            {getLocalizedText(benefit.text, benefit.textZh)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              {getLocalizedText('Ready to Power Your Life?', '准备为您的生活提供动力了吗？')}
            </h3>
            <p className="text-blue-100 mb-6">
              {getLocalizedText(
                'Contact us today to learn more about our solar solutions and find the perfect fit for your needs.',
                '立即联系我们，了解更多关于我们的太阳能解决方案，找到适合您需求的完美产品。'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  {getLocalizedText('Get Free Consultation', '获取免费咨询')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  {getLocalizedText('Explore Solutions', '探索解决方案')}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}