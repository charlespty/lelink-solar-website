import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ProductImageCarousel } from '@/components/ProductImageCarousel'
import { getAllProducts } from '@/lib/productsData'
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
  Download,
  Share2,
  Heart,
  Clock,
  Users,
  Award,
  Package,
  Wrench,
  Settings
} from 'lucide-react'
import { getProductById } from '@/lib/productsData'

// Generate static params for all products
export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((product) => ({
    id: product.id,
  }))
}

// Helper function for localization (simplified for server component)
const getLocalizedText = (enText: string, zhText: string, currentLanguage: string = 'en') => {
  return currentLanguage === 'zh' ? zhText : enText
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const currentLanguage = 'en' // Default to English for server component

  const product = getProductById(id)

  if (!product) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button variant="accent">
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{getLocalizedText(product.name, product.nameZh, currentLanguage)} - Lelink Solar</title>
        <meta name="description" content={getLocalizedText(product.description, product.descriptionZh, currentLanguage)} />
      </Head>

      <div className="min-h-screen bg-dark-900 text-white">
        <Header />
        
        <main>
          {/* Breadcrumbs */}
          <section className="py-4 bg-slate-800/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <nav className="text-sm" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-primary-500">
                      {getLocalizedText('Home', '首页', currentLanguage)}
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-500">/</span>
                  </li>
                  <li>
                    <Link href="/products" className="text-gray-400 hover:text-primary-500">
                      {getLocalizedText('Products', '产品', currentLanguage)}
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-500">/</span>
                  </li>
                  <li className="text-primary-400">
                    {getLocalizedText(product.name, product.nameZh, currentLanguage)}
                  </li>
                </ol>
              </nav>
            </div>
          </section>

          {/* Product Details */}
          <section className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Images */}
                <ProductImageCarousel 
                  images={product.images}
                  alt={getLocalizedText(product.name, product.nameZh, currentLanguage)}
                />

                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {getLocalizedText(product.name, product.nameZh, currentLanguage)}
                    </h1>
                    <p className="text-gray-300 text-lg">
                      {getLocalizedText(product.description, product.descriptionZh, currentLanguage)}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <Link href="/contact">
                      <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                        {getLocalizedText('Get Quote', '获取报价', currentLanguage)}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
                      <Download className="w-4 h-4 mr-2" />
                      {getLocalizedText('Download Specs', '下载规格', currentLanguage)}
                    </Button>
                    <Button variant="outline" className="border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-white">
                      {getLocalizedText('Key Features', '主要特点', currentLanguage)}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {product.keyFeatures.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-slate-800/50 rounded-lg">
                            <Icon className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-white">
                                {getLocalizedText(feature.text, feature.textZh, currentLanguage)}
                              </h4>
                              <p className="text-sm text-gray-400">
                                {getLocalizedText(feature.description, feature.descriptionZh, currentLanguage)}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Specifications */}
          <section className="py-12 bg-slate-800/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-white mb-8">
                {getLocalizedText('Technical Specifications', '技术规格', currentLanguage)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.specifications.map((spec, index) => (
                  <Card key={index} className="bg-slate-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">
                          {getLocalizedText(spec.name, spec.nameZh, currentLanguage)}
                        </span>
                        <span className="font-semibold text-white">
                          {spec.value} {spec.unit}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Detailed Charging & Output Specifications (Only for LK-2000) */}
          {product.chargingMethods && product.chargingMethods.length > 0 && (
            <section className="py-12">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                  {getLocalizedText('Charging & Output Details', '充电和输出详情', currentLanguage)}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Charging Methods */}
                  <Card className="bg-slate-800/50 border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-xl text-white flex items-center space-x-2">
                        <Sun className="w-6 h-6 text-blue-400" />
                        <span>{getLocalizedText('Charging Methods', '充电方式', currentLanguage)}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.chargingMethods.map((method, index) => (
                        <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                          <h4 className="font-semibold text-white mb-2">{getLocalizedText(method.name, method.nameZh, currentLanguage)}</h4>
                          <p className="text-gray-300 text-sm">{method.value}</p>
                          <p className="text-gray-400 text-sm">{getLocalizedText(method.description, method.descriptionZh, currentLanguage)}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Output Ports */}
                  <Card className="bg-slate-800/50 border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-xl text-white flex items-center space-x-2">
                        <Zap className="w-6 h-6 text-blue-400" />
                        <span>{getLocalizedText('Output Ports', '输出端口', currentLanguage)}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.outputPorts.map((port, index) => (
                        <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                          <h4 className="font-semibold text-white mb-2">{getLocalizedText(port.name, port.nameZh, currentLanguage)}</h4>
                          <p className="text-gray-300 text-sm">{port.value}</p>
                          <p className="text-gray-400 text-sm">{getLocalizedText(port.description, port.descriptionZh, currentLanguage)}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          )}

          {/* Application Scenarios */}
          <section className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                {getLocalizedText('Application Scenarios', '应用场景', currentLanguage)}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {product.applicationScenarios.map((application, index) => {
                  const Icon = (index === 0 ? Home : index === 1 ? Tent : index === 2 ? Shield : Building2)
                  return (
                    <div key={application.name}>
                      <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm">
                        <CardHeader>
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="p-3 bg-blue-600/20 rounded-lg">
                              <Icon className="w-6 h-6 text-blue-400" />
                            </div>
                            <CardTitle className="text-xl text-white">
                              {getLocalizedText(application.name, application.nameZh, currentLanguage)}
                            </CardTitle>
                          </div>
                          <p className="text-gray-300">
                            {getLocalizedText(application.description, application.descriptionZh, currentLanguage)}
                          </p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-2">
                                {getLocalizedText('Key Applications', '主要应用', currentLanguage)}:
                              </h4>
                              <div className="space-y-2">
                                {application.useCases.map((useCase, useCaseIndex) => (
                                  <div key={useCaseIndex} className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span className="text-gray-300 text-sm">
                                      {getLocalizedText(useCase.text, useCase.textZh, currentLanguage)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-2">
                                {getLocalizedText('Power Examples', '功率示例', currentLanguage)}:
                              </h4>
                              <div className="space-y-2">
                                {application.powerExamples.map((example, exampleIndex) => (
                                  <div key={exampleIndex} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-300">
                                      {getLocalizedText(example.appliance, example.applianceZh, currentLanguage)}
                                    </span>
                                    <span className="text-blue-400">
                                      {example.power} - {example.duration}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Customization Service (Only for LP-400W) */}
          {product.customizationService && (
            <section className="py-12 bg-slate-800/30">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                  {getLocalizedText(product.customizationService.title, product.customizationService.titleZh, currentLanguage)}
                </h2>
                <p className="text-lg text-gray-300 mb-10 text-center max-w-3xl mx-auto">
                  {getLocalizedText(product.customizationService.description, product.customizationService.descriptionZh, currentLanguage)}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                  {product.customizationService.workflow.map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="p-4 bg-blue-600/20 rounded-full mb-4">
                        <span className="text-2xl font-bold text-blue-400">{index + 1}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {getLocalizedText(step.step, step.stepZh, currentLanguage)}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* After-Sales & Certifications (Only for LP-400W) */}
          {product.afterSalesAndCertifications && (
            <section className="py-12">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                  {getLocalizedText(product.afterSalesAndCertifications.title, product.afterSalesAndCertifications.titleZh, currentLanguage)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-slate-800/50 border-green-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <Award className="h-8 w-8 text-green-400" />
                        <h3 className="text-xl font-semibold text-white">
                          {getLocalizedText('Warranty & Support', '保修与支持', currentLanguage)}
                        </h3>
                      </div>
                      <p className="text-gray-300">
                        {getLocalizedText(product.afterSalesAndCertifications.warranty, product.afterSalesAndCertifications.warrantyZh, currentLanguage)}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/50 border-yellow-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <CheckCircle className="h-8 w-8 text-yellow-400" />
                        <h3 className="text-xl font-semibold text-white">
                          {getLocalizedText('Certifications & Quality', '认证与质量', currentLanguage)}
                        </h3>
                      </div>
                      <p className="text-gray-300 mb-2">
                        {getLocalizedText(product.afterSalesAndCertifications.certifications, product.afterSalesAndCertifications.certificationsZh, currentLanguage)}
                      </p>
                      <p className="text-gray-300">
                        {getLocalizedText(product.afterSalesAndCertifications.testing, product.afterSalesAndCertifications.testingZh, currentLanguage)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-12 bg-primary-600">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                {getLocalizedText('Ready to Get Started?', '准备开始了吗？', currentLanguage)}
              </h2>
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                {getLocalizedText(
                  'Contact us today to learn more about our solar solutions and get a customized quote.',
                  '立即联系我们，了解更多太阳能解决方案并获得定制报价。',
                  currentLanguage
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="accent">
                    {getLocalizedText('Contact Us', '联系我们', currentLanguage)}
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