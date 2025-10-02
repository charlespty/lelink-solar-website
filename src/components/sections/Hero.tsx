'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
// import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { getImagePath } from '@/lib/imageUtils'
import { 
  Zap, 
  Sun, 
  Shield, 
  Battery,
  ArrowRight,
  Play
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'High Power Output',
    titleZh: '高功率输出',
    description: 'Up to 3000W continuous power',
    descriptionZh: '连续功率高达3000W',
  },
  {
    icon: Sun,
    title: 'Solar Charging',
    titleZh: '太阳能充电',
    description: 'Fast solar panel charging',
    descriptionZh: '快速太阳能板充电',
  },
  {
    icon: Shield,
    title: 'Reliable & Safe',
    titleZh: '可靠安全',
    description: 'Advanced protection systems',
    descriptionZh: '先进保护系统',
  },
  {
    icon: Battery,
    title: 'Long Lasting',
    titleZh: '持久耐用',
    description: '10+ years battery life',
    descriptionZh: '10年以上电池寿命',
  },
]

export default function Hero() {
  // const { t, i18n } = useTranslation('common')
  const isZh = false // Simplified for now

  const getLocalizedText = (en: string, zh: string) => {
    return isZh ? zh : en
  }

  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-dark-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/solar-pattern.svg')] bg-repeat bg-center"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                {getLocalizedText(
                  'Power Your Future with Solar Energy',
                  '用太阳能点亮您的未来'
                )}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-200 leading-relaxed max-w-2xl"
              >
                {getLocalizedText(
                  'Professional solar generator solutions for homes, businesses, and outdoor adventures. Clean, reliable, and sustainable power wherever you need it.',
                  '为家庭、企业和户外探险提供专业的太阳能发电机解决方案。清洁、可靠、可持续的电力，随时随地为您提供动力。'
                )}
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/products">
                <Button
                  size="xl"
                  variant="accent"
                  className="group"
                >
                  {getLocalizedText('Explore Products', '探索产品')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/calculator">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-800"
                >
                  {getLocalizedText('Power Calculator', '功率计算器')}
                </Button>
              </Link>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 gap-4 pt-8"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="flex items-center space-x-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm"
                  >
                    <div className="flex-shrink-0">
                      <Icon className="h-6 w-6 text-secondary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">
                        {getLocalizedText(feature.title, feature.titleZh)}
                      </h3>
                      <p className="text-xs text-gray-300">
                        {getLocalizedText(feature.description, feature.descriptionZh)}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Content - Product Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Product Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative z-10"
              >
                <Image
                  src={getImagePath("/images/Product image/Front Side.png")}
                  alt="Lelink Solar Generator"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute -top-4 -right-4 bg-secondary-500 text-white p-3 rounded-full shadow-lg"
              >
                <Zap className="h-6 w-6" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="absolute -bottom-4 -left-4 bg-accent-500 text-white p-3 rounded-full shadow-lg"
              >
                <Sun className="h-6 w-6" />
              </motion.div>

              {/* Video Play Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors p-4 rounded-full"
              >
                <Play className="h-8 w-8 text-white" />
              </motion.button>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/20 to-accent-500/20 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-16 fill-white"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  )
}
