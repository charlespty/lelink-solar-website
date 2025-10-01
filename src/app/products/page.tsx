'use client'

import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  Zap, 
  Sun, 
  Battery, 
  Shield, 
  ArrowRight,
  Download,
  Star,
  CheckCircle,
  Package
} from 'lucide-react'
import { getAllProducts } from '@/lib/productsData'

// Helper function for localization
const getLocalizedText = (enText: string, zhText: string, currentLanguage: string = 'en') => {
  return currentLanguage === 'zh' ? zhText : enText
}

export default function ProductsPage() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'zh'>('en')
  const products = getAllProducts()

  return (
    <>
      <Head>
        <title>Products - Lelink Solar</title>
        <meta name="description" content="Explore our range of solar power solutions including portable generators and foldable solar panels" />
      </Head>

      <div className="min-h-screen bg-dark-900 text-white">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-dark-900 text-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {getLocalizedText('Our Products', '我们的产品', currentLanguage)}
                </h1>
                <p className="text-xl text-primary-200 max-w-3xl mx-auto">
                  {getLocalizedText(
                    'Discover our comprehensive range of solar power solutions designed for every need.',
                    '探索我们全面的太阳能解决方案，满足各种需求。',
                    currentLanguage
                  )}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm overflow-hidden h-full">
                      <div className="grid md:grid-cols-2 gap-8 p-8 h-full">
                        <div className="relative h-80 bg-transparent rounded-lg flex items-center justify-center">
                          <Image
                            src={product.images[0]}
                            alt={getLocalizedText(product.name, product.nameZh, currentLanguage)}
                            width={300}
                            height={200}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                              {getLocalizedText(product.name, product.nameZh, currentLanguage)}
                            </h3>
                            <p className="text-gray-300 mb-6">
                              {getLocalizedText(product.description, product.descriptionZh, currentLanguage)}
                            </p>
                            
                            {/* Key Features */}
                            <div className="grid grid-cols-1 gap-3 mb-6">
                              {product.keyFeatures.slice(0, 3).map((feature, featureIndex) => {
                                const Icon = feature.icon
                                return (
                                  <div key={featureIndex} className="flex items-center space-x-3">
                                    <Icon className="w-5 h-5 text-blue-400" />
                                    <span className="text-gray-300 text-sm">
                                      {getLocalizedText(feature.text, feature.textZh, currentLanguage)}
                                    </span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                          
                          {/* CTA Buttons */}
                          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                            <Link href={`/products/${product.id}`}>
                              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                                {getLocalizedText('View Details', '查看详情', currentLanguage)}
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                            <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
                              <Download className="w-4 h-4 mr-2" />
                              {getLocalizedText('Download Specs', '下载规格', currentLanguage)}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Product Comparison */}
          <section className="py-16 bg-slate-800/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  {getLocalizedText('Product Comparison', '产品对比', currentLanguage)}
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  {getLocalizedText(
                    'Compare our products to find the perfect solution for your needs.',
                    '比较我们的产品，找到适合您需求的完美解决方案。',
                    currentLanguage
                  )}
                </p>
              </motion.div>

              <div className="overflow-x-auto">
                <table className="w-full bg-slate-800/50 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-slate-700/50">
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        {getLocalizedText('Feature', '特性', currentLanguage)}
                      </th>
                      {products.map((product) => (
                        <th key={product.id} className="px-6 py-4 text-center text-white font-semibold">
                          {getLocalizedText(product.name, product.nameZh, currentLanguage)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-700">
                      <td className="px-6 py-4 text-gray-300">
                        {getLocalizedText('Type', '类型', currentLanguage)}
                      </td>
                      {products.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-center text-white">
                          {product.id === 'lk-solar-generator-lk-2000' 
                            ? getLocalizedText('Portable Power Station', '便携式电源站', currentLanguage)
                            : getLocalizedText('Solar Panel', '太阳能板', currentLanguage)
                          }
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="px-6 py-4 text-gray-300">
                        {getLocalizedText('Max Power', '最大功率', currentLanguage)}
                      </td>
                      {products.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-center text-white">
                          {product.id === 'lk-solar-generator-lk-2000' ? '2000W' : '400W'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="px-6 py-4 text-gray-300">
                        {getLocalizedText('Battery Capacity', '电池容量', currentLanguage)}
                      </td>
                      {products.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-center text-white">
                          {product.id === 'lk-solar-generator-lk-2000' 
                            ? getLocalizedText('2300WH/3070WH', '2300WH/3070WH', currentLanguage)
                            : getLocalizedText('N/A', '不适用', currentLanguage)
                          }
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="px-6 py-4 text-gray-300">
                        {getLocalizedText('Weight', '重量', currentLanguage)}
                      </td>
                      {products.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-center text-white">
                          {product.id === 'lk-solar-generator-lk-2000' 
                            ? getLocalizedText('22.6KG/24.65KG', '22.6KG/24.65KG', currentLanguage)
                            : getLocalizedText('10KG', '10KG', currentLanguage)
                          }
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="px-6 py-4 text-gray-300">
                        {getLocalizedText('Best For', '最适合', currentLanguage)}
                      </td>
                      {products.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-center text-white">
                          {product.id === 'lk-solar-generator-lk-2000' 
                            ? getLocalizedText('Home Backup, Outdoor Adventures', '家庭备用、户外探险', currentLanguage)
                            : getLocalizedText('Portable Charging, RV Power', '便携充电、房车供电', currentLanguage)
                          }
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 bg-primary-600">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                {getLocalizedText('Need Help Choosing?', '需要帮助选择？', currentLanguage)}
              </h2>
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                {getLocalizedText(
                  'Our experts can help you find the perfect solar solution for your specific needs.',
                  '我们的专家可以帮助您找到适合您特定需求的完美太阳能解决方案。',
                  currentLanguage
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="accent">
                    {getLocalizedText('Get Expert Advice', '获取专家建议', currentLanguage)}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/calculator">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                    {getLocalizedText('Power Calculator', '功率计算器', currentLanguage)}
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}