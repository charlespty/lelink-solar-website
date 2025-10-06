'use client'

import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  ArrowLeft,
  CheckCircle,
  Zap,
  Sun,
  Shield,
  Monitor,
  Settings,
  FileText,
  Globe,
  DollarSign
} from 'lucide-react'

// 本地化文本函数
function getLocalizedText(en: string, zh: string, currentLanguage: 'en' | 'zh' = 'en'): string {
  return currentLanguage === 'zh' ? zh : en
}

export default function SolarInverterGuidePage() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'zh'>('en')

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'zh' : 'en')
  }

  return (
    <>
      <Head>
        <title>{getLocalizedText('Solar Inverter Selection Guide - Lelink Solar', '太阳能逆变器选择指南 - Lelink Solar', currentLanguage)}</title>
        <meta name="description" content={getLocalizedText(
          'Essential factors for choosing the right solar inverter for optimal system performance and efficiency.',
          '选择合适太阳能逆变器的关键因素，确保系统最佳性能和效率。',
          currentLanguage
        )} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="mb-6">
                  <Link 
                    href="/support/faq" 
                    className="inline-flex items-center text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {getLocalizedText('Back to FAQ', '返回常见问题', currentLanguage)}
                  </Link>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {getLocalizedText('Key Factors for Choosing Solar Inverters', '太阳能逆变器关键选择因素', currentLanguage)}
                </h1>
                <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                  {getLocalizedText(
                    'Essential selection criteria for optimal solar performance and long-term reliability.',
                    '确保太阳能系统最佳性能和长期可靠性的关键选择标准。',
                    currentLanguage
                  )}
                </p>

                {/* Language Switcher */}
                <div className="flex justify-center">
                  <Button
                    onClick={toggleLanguage}
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    {currentLanguage === 'en' ? '中文' : 'English'}
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Article Content */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-8"
                  >
                    {/* Hero Image */}
                    <div className="mb-8">
                      <Image
                        src="/images/solar-inverter-guide/solar-inverter-selection-hero.jpg"
                        alt={getLocalizedText('Solar Inverter Selection Guide', '太阳能逆变器选择指南', currentLanguage)}
                        width={800}
                        height={400}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-sm text-gray-600 mt-2 italic">
                        {getLocalizedText('Choosing the right solar inverter is crucial for optimal system performance', '选择正确的太阳能逆变器对系统最佳性能至关重要', currentLanguage)}
                      </p>
                    </div>

                    {/* Introduction */}
                    <div className="prose prose-lg max-w-none mb-8">
                      <p className="text-gray-700 leading-relaxed">
                        {getLocalizedText(
                          'When selecting a solar inverter, several critical factors determine system efficiency and long-term reliability. Understanding these key considerations will help you make an informed decision for your solar energy system.',
                          '选择太阳能逆变器时，几个关键因素决定了系统效率和长期可靠性。了解这些关键考虑因素将帮助您为太阳能系统做出明智的决定。',
                          currentLanguage
                        )}
                      </p>
                    </div>

                    {/* Power Rating Section */}
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <Zap className="w-6 h-6 mr-3 text-blue-600" />
                        {getLocalizedText('Power Rating', '功率额定值', currentLanguage)}
                      </h2>
                      <p className="text-gray-700 mb-4">
                        {getLocalizedText(
                          'Power rating is fundamental - choose an inverter that matches your solar panel array\'s total wattage, typically sized at 80-90% of panel capacity for optimal performance.',
                          '功率额定值是基础 - 选择与太阳能电池板阵列总瓦数匹配的逆变器，通常按面板容量的80-90%进行配置以获得最佳性能。',
                          currentLanguage
                        )}
                      </p>
                      <Image
                        src="/images/solar-inverter-guide/inverter-power-rating-chart.jpg"
                        alt={getLocalizedText('Power Rating Chart', '功率评级图表', currentLanguage)}
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-sm text-gray-600 mt-2 italic">
                        {getLocalizedText('Power rating sizing chart for optimal inverter selection', '最佳逆变器选择的功率评级配置图表', currentLanguage)}
                      </p>
                    </div>

                    {/* Efficiency and Compatibility Section */}
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <Sun className="w-6 h-6 mr-3 text-blue-600" />
                        {getLocalizedText('Efficiency & Compatibility', '效率与兼容性', currentLanguage)}
                      </h2>
                      <p className="text-gray-700 mb-4">
                        {getLocalizedText(
                          'Efficiency ratings directly impact energy production. Premium inverters achieve 97-98% efficiency, converting more DC power to usable AC electricity. Grid-tie vs. off-grid compatibility is crucial - grid-tie inverters synchronize with utility power, while off-grid models work with battery storage systems.',
                          '效率等级直接影响能源生产。优质逆变器达到97-98%的效率，将更多直流电转换为可用的交流电。并网与离网兼容性至关重要 - 并网逆变器与电网同步，而离网型号与电池存储系统配合工作。',
                          currentLanguage
                        )}
                      </p>
                      <Image
                        src="/images/solar-inverter-guide/grid-tie-off-grid-comparison.jpg"
                        alt={getLocalizedText('Grid-tie vs Off-grid Inverters', '并网与离网逆变器对比', currentLanguage)}
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-sm text-gray-600 mt-2 italic">
                        {getLocalizedText('Comparison between grid-tie and off-grid inverter systems', '并网和离网逆变器系统对比', currentLanguage)}
                      </p>
                    </div>

                    {/* MPPT Technology Section */}
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <Monitor className="w-6 h-6 mr-3 text-blue-600" />
                        {getLocalizedText('MPPT Technology', 'MPPT技术', currentLanguage)}
                      </h2>
                      <p className="text-gray-700 mb-4">
                        {getLocalizedText(
                          'MPPT (Maximum Power Point Tracking) technology maximizes energy harvest by continuously optimizing voltage and current. Weather resistance and warranty coverage (typically 10-25 years) ensure long-term reliability. Monitoring capabilities enable real-time performance tracking and early fault detection.',
                          'MPPT（最大功率点跟踪）技术通过持续优化电压和电流来最大化能源收获。耐候性和保修覆盖（通常10-25年）确保长期可靠性。监控功能实现实时性能跟踪和早期故障检测。',
                          currentLanguage
                        )}
                      </p>
                      <Image
                        src="/images/solar-inverter-guide/mppt-technology-diagram.jpg"
                        alt={getLocalizedText('MPPT Technology Diagram', 'MPPT技术图解', currentLanguage)}
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-sm text-gray-600 mt-2 italic">
                        {getLocalizedText('How MPPT technology optimizes solar energy harvest', 'MPPT技术如何优化太阳能收获', currentLanguage)}
                      </p>
                    </div>

                    {/* Installation and Cost Section */}
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <Settings className="w-6 h-6 mr-3 text-blue-600" />
                        {getLocalizedText('Installation & Cost Considerations', '安装与成本考虑', currentLanguage)}
                      </h2>
                      <p className="text-gray-700 mb-4">
                        {getLocalizedText(
                          'Installation requirements include proper ventilation, mounting options, and electrical compatibility. Consider local regulations and utility interconnection standards for seamless grid integration. Cost-effectiveness balances upfront investment with long-term energy savings and maintenance requirements.',
                          '安装要求包括适当的通风、安装选项和电气兼容性。考虑当地法规和公用事业互连标准以实现无缝电网集成。成本效益平衡前期投资与长期节能和维护要求。',
                          currentLanguage
                        )}
                      </p>
                      <Image
                        src="/images/solar-inverter-guide/solar-inverter-installation.jpg"
                        alt={getLocalizedText('Solar Inverter Installation', '太阳能逆变器安装', currentLanguage)}
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-sm text-gray-600 mt-2 italic">
                        {getLocalizedText('Professional solar inverter installation ensures optimal performance', '专业太阳能逆变器安装确保最佳性能', currentLanguage)}
                      </p>
                    </div>

                    {/* Conclusion */}
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {getLocalizedText('Conclusion', '结论', currentLanguage)}
                      </h3>
                      <p className="text-gray-700">
                        {getLocalizedText(
                          'Choosing the right inverter optimizes your solar investment, ensuring maximum energy production and system longevity for years of clean, reliable power generation.',
                          '选择正确的逆变器优化您的太阳能投资，确保最大能源生产和系统寿命，实现多年的清洁、可靠发电。',
                          currentLanguage
                        )}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-6"
                  >
                    {/* Key Selection Checklist */}
                    <Card className="bg-white shadow-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center text-gray-900">
                          <FileText className="w-5 h-5 mr-2 text-blue-600" />
                          {getLocalizedText('Key Selection Checklist', '关键选择清单', currentLanguage)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {getLocalizedText('Power Rating', '功率额定值', currentLanguage)}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {getLocalizedText('Match 80-90% of panel capacity', '匹配面板容量的80-90%', currentLanguage)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {getLocalizedText('Efficiency', '效率', currentLanguage)}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {getLocalizedText('Look for 97-98% efficiency ratings', '寻找97-98%效率等级', currentLanguage)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {getLocalizedText('MPPT Technology', 'MPPT技术', currentLanguage)}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {getLocalizedText('Multiple MPPT trackers preferred', '首选多个MPPT跟踪器', currentLanguage)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {getLocalizedText('Weather Rating', '耐候等级', currentLanguage)}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {getLocalizedText('IP65+ for outdoor installation', '户外安装需IP65+', currentLanguage)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {getLocalizedText('Warranty', '保修', currentLanguage)}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {getLocalizedText('10-25 year coverage standard', '10-25年覆盖标准', currentLanguage)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {getLocalizedText('Monitoring', '监控', currentLanguage)}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {getLocalizedText('Real-time performance tracking', '实时性能跟踪', currentLanguage)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Related Links */}
                    <Card className="bg-white shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-gray-900">
                          {getLocalizedText('Related Resources', '相关资源', currentLanguage)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Link 
                          href="/support/faq" 
                          className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <h4 className="font-semibold text-gray-900">
                            {getLocalizedText('FAQ', '常见问题', currentLanguage)}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {getLocalizedText('Common questions about solar systems', '关于太阳能系统的常见问题', currentLanguage)}
                          </p>
                        </Link>
                        
                        <Link 
                          href="/calculator" 
                          className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <h4 className="font-semibold text-gray-900">
                            {getLocalizedText('Power Calculator', '功率计算器', currentLanguage)}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {getLocalizedText('Calculate your power needs', '计算您的功率需求', currentLanguage)}
                          </p>
                        </Link>
                        
                        <Link 
                          href="/contact" 
                          className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <h4 className="font-semibold text-gray-900">
                            {getLocalizedText('Contact Us', '联系我们', currentLanguage)}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {getLocalizedText('Get expert advice', '获得专家建议', currentLanguage)}
                          </p>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
