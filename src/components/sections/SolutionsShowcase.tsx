'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
// import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  Home, 
  Mountain, 
  Shield, 
  Building,
  ArrowRight,
  CheckCircle,
  Users,
  Zap
} from 'lucide-react'

const solutions = [
  {
    id: 'home-energy',
    name: 'Home Energy Solutions',
    nameZh: '家庭能源解决方案',
    description: 'Complete solar power systems for residential homes with backup power and grid-tie options.',
    descriptionZh: '为住宅提供完整的太阳能系统，包含备用电源和并网选项。',
    image: '/images/Application scenario.jpg',
    icon: Home,
    features: [
      'Reduce electricity bills by up to 90%',
      '24/7 backup power during outages',
      'Smart energy monitoring',
      '25-year warranty coverage'
    ],
    featuresZh: [
      '电费减少高达90%',
      '停电时24/7备用电源',
      '智能能源监控',
      '25年保修覆盖'
    ],
    benefits: [
      'Lower energy costs',
      'Increased home value',
      'Environmental protection',
      'Energy independence'
    ],
    benefitsZh: [
      '降低能源成本',
      '增加房屋价值',
      '环境保护',
      '能源独立'
    ],
    stats: {
      savings: '90%',
      savingsZh: '90%',
      power: '10kW',
      warranty: '25 years',
      warrantyZh: '25年'
    }
  },
  {
    id: 'outdoor-camping',
    name: 'Outdoor Camping',
    nameZh: '户外露营',
    description: 'Portable solar generators perfect for camping, RV trips, and outdoor adventures.',
    descriptionZh: '便携式太阳能发电机，完美适用于露营、房车旅行和户外探险。',
    image: '/images/Outdoor.png',
    icon: Mountain,
    features: [
      'Lightweight and portable design',
      'Silent operation',
      'Multiple charging options',
      'Weather-resistant construction'
    ],
    featuresZh: [
      '轻量便携设计',
      '静音运行',
      '多种充电方式',
      '耐候结构'
    ],
    benefits: [
      'Clean power anywhere',
      'No fuel required',
      'Quiet operation',
      'Easy to transport'
    ],
    benefitsZh: [
      '任何地方清洁电力',
      '无需燃料',
      '静音运行',
      '易于运输'
    ],
    stats: {
      weight: '15kg',
      power: '3kW',
      runtime: '8 hours',
      runtimeZh: '8小时',
      charging: '4 hours',
      chargingZh: '4小时'
    }
  },
  {
    id: 'emergency-backup',
    name: 'Emergency Backup',
    nameZh: '应急备用',
    description: 'Reliable backup power solutions for emergencies, natural disasters, and power outages.',
    descriptionZh: '为紧急情况、自然灾害和停电提供可靠的备用电源解决方案。',
    image: '/images/Application scenario2.jpg',
    icon: Shield,
    features: [
      'Instant power restoration',
      'Automatic transfer switch',
      'Extended runtime capability',
      'Remote monitoring system'
    ],
    featuresZh: [
      '即时电力恢复',
      '自动转换开关',
      '延长运行时间',
      '远程监控系统'
    ],
    benefits: [
      'Peace of mind',
      'Protect electronics',
      'Maintain comfort',
      'Business continuity'
    ],
    benefitsZh: [
      '安心保障',
      '保护电子设备',
      '保持舒适',
      '业务连续性'
    ],
    stats: {
      response: '<1 second',
      responseZh: '<1秒',
      runtime: '72 hours',
      runtimeZh: '72小时',
      capacity: '20kW',
      monitoring: '24/7',
      monitoringZh: '24/7'
    }
  },
  {
    id: 'commercial-industrial',
    name: 'Commercial & Industrial',
    nameZh: '商业工业',
    description: 'Large-scale solar solutions for businesses, factories, and industrial applications.',
    descriptionZh: '为商业、工厂和工业应用提供大规模太阳能解决方案。',
    image: '/images/Solar Usuage.png',
    icon: Building,
    features: [
      'Scalable power systems',
      'Industrial-grade components',
      'Advanced monitoring',
      'Custom installation'
    ],
    featuresZh: [
      '可扩展电力系统',
      '工业级组件',
      '先进监控',
      '定制安装'
    ],
    benefits: [
      'Reduce operating costs',
      'Meet sustainability goals',
      'Improve energy security',
      'Tax incentives available'
    ],
    benefitsZh: [
      '降低运营成本',
      '实现可持续发展目标',
      '提高能源安全',
      '可享受税收优惠'
    ],
    stats: {
      capacity: '1MW+',
      savings: '50%',
      savingsZh: '50%',
      payback: '5 years',
      paybackZh: '5年',
      roi: '20%',
      roiZh: '20%'
    }
  }
]

export default function SolutionsShowcase() {
  // const { t, i18n } = useTranslation('common')
  const isZh = false // Simplified for now

  const getLocalizedText = (en: string, zh: string) => {
    return isZh ? zh : en
  }

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
            {getLocalizedText('Solar Solutions for Every Need', '满足各种需求的太阳能解决方案')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {getLocalizedText(
              'From residential homes to large-scale industrial applications, we provide comprehensive solar energy solutions tailored to your specific requirements.',
              '从住宅到大规模工业应用，我们提供量身定制的综合太阳能解决方案。'
            )}
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {solutions.map((solution, index) => {
            const Icon = solution.icon
            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow group h-full">
                  <div className="relative h-64 bg-gray-100">
                    <Image
                      src={solution.image}
                      alt={getLocalizedText(solution.name, solution.nameZh)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {getLocalizedText(solution.name, solution.nameZh)}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {getLocalizedText(solution.description, solution.descriptionZh)}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Key Features */}
                    <div>
                      <h4 className="font-semibold text-dark-900 mb-3 flex items-center">
                        <CheckCircle className="h-5 w-5 text-secondary-500 mr-2" />
                        {getLocalizedText('Key Features', '主要特点')}
                      </h4>
                      <ul className="space-y-2">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">
                              {getLocalizedText(feature, solution.featuresZh[featureIndex])}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold text-dark-900 mb-3 flex items-center">
                        <Users className="h-5 w-5 text-accent-500 mr-2" />
                        {getLocalizedText('Benefits', '优势')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {solution.benefits.map((benefit, benefitIndex) => (
                          <span
                            key={benefitIndex}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-100 text-accent-800"
                          >
                            {getLocalizedText(benefit, solution.benefitsZh[benefitIndex])}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      {Object.entries(solution.stats).map(([key, value], statIndex) => {
                        if (key.includes('Zh')) return null
                        const zhKey = `${key}Zh`
                        const zhValue = solution.stats[zhKey as keyof typeof solution.stats]
                        return (
                          <div key={key} className="text-center">
                            <div className="text-2xl font-bold text-primary-600">
                              {getLocalizedText(value, zhValue || value)}
                            </div>
                            <div className="text-sm text-gray-600 capitalize">
                              {getLocalizedText(key.replace(/([A-Z])/g, ' $1').toLowerCase(), key)}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>

                  <div className="p-6 pt-0">
                    <Link href={`/solutions/${solution.id}`}>
                      <Button variant="default" className="w-full">
                        {getLocalizedText('Learn More', '了解更多')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
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
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {getLocalizedText('Ready to Go Solar?', '准备使用太阳能了吗？')}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {getLocalizedText(
                'Get a free consultation and customized quote for your solar energy needs.',
                '获取免费咨询和定制报价，满足您的太阳能需求。'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator">
                <Button size="lg" variant="accent">
                  <Zap className="mr-2 h-5 w-5" />
                  {getLocalizedText('Power Calculator', '功率计算器')}
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                  {getLocalizedText('Get Free Quote', '获取免费报价')}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
