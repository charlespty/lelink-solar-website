'use client'

import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  ChevronDown, 
  ChevronUp, 
  Search,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail
} from 'lucide-react'

const faqData = [
  {
    id: 1,
    questionEn: 'What is the power output of the LE Solar Generator?',
    questionZh: 'LE太阳能发电机的功率输出是多少？',
    answerEn: 'The LE Solar Generator provides 3000W continuous power output with 6000W surge capacity. It features a 3000Wh LiFePO4 battery that can power essential appliances for extended periods.',
    answerZh: 'LE太阳能发电机提供3000W连续功率输出，峰值功率6000W。配备3000Wh磷酸铁锂电池，可为重要电器提供长时间供电。'
  },
  {
    id: 11,
    questionEn: 'How do I choose the right solar inverter for my system?',
    questionZh: '如何为我的系统选择合适的太阳能逆变器？',
    answerEn: 'Choosing the right solar inverter involves considering power rating (80-90% of panel capacity), efficiency ratings (97-98%), MPPT technology, weather resistance, and warranty coverage. Check our comprehensive Solar Inverter Selection Guide for detailed information.',
    answerZh: '选择合适的太阳能逆变器需要考虑功率额定值（面板容量的80-90%）、效率等级（97-98%）、MPPT技术、耐候性和保修覆盖。查看我们的综合太阳能逆变器选择指南获取详细信息。',
    hasGuide: true
  },
  {
    id: 2,
    questionEn: 'How long does it take to fully charge the solar generator?',
    questionZh: '太阳能发电机完全充电需要多长时间？',
    answerEn: 'With 1200W maximum solar input, the LE Solar Generator can be fully charged in 3-4 hours under optimal sunlight conditions. It also supports AC charging for faster charging when grid power is available.',
    answerZh: '在最佳阳光条件下，LE太阳能发电机通过1200W最大太阳能输入可在3-4小时内完全充电。还支持AC充电，在有电网电力时充电更快。'
  },
  {
    id: 3,
    questionEn: 'Can I use this generator during a power outage?',
    questionZh: '停电时我可以使用这个发电机吗？',
    answerEn: 'Yes, the LE Solar Generator is perfect for power outages. It provides clean, silent backup power for essential appliances like refrigerators, lights, medical equipment, and communication devices.',
    answerZh: '是的，LE太阳能发电机非常适合停电时使用。它为冰箱、照明、医疗设备和通信设备等重要电器提供清洁、静音的备用电源。'
  },
  {
    id: 4,
    questionEn: 'Is the solar generator weather resistant?',
    questionZh: '太阳能发电机是否防风雨？',
    answerEn: 'Yes, the LE Solar Generator is designed with weather-resistant materials and IP65 rating. It can withstand various weather conditions including rain, dust, and temperature extremes from -10°C to 40°C.',
    answerZh: '是的，LE太阳能发电机采用防风雨材料设计，具有IP65防护等级。可承受各种天气条件，包括雨、灰尘和-10°C至40°C的极端温度。'
  },
  {
    id: 5,
    questionEn: 'What appliances can I power with this generator?',
    questionZh: '我可以用这个发电机为哪些电器供电？',
    answerEn: 'The LE Solar Generator can power a wide range of appliances including refrigerators (150W), LED lights (50W), TVs (100W), laptops (60W), power tools (up to 1000W), and many other household and outdoor devices.',
    answerZh: 'LE太阳能发电机可为多种电器供电，包括冰箱(150W)、LED灯(50W)、电视(100W)、笔记本电脑(60W)、电动工具(最高1000W)以及许多其他家用和户外设备。'
  },
  {
    id: 6,
    questionEn: 'How long is the warranty period?',
    questionZh: '保修期是多长？',
    answerEn: 'The LE Solar Generator comes with a 5-year comprehensive warranty covering the entire unit, including the battery, inverter, and all electronic components. We also provide lifetime technical support.',
    answerZh: 'LE太阳能发电机提供5年全面保修，涵盖整个设备，包括电池、逆变器和所有电子组件。我们还提供终身技术支持。'
  },
  {
    id: 7,
    questionEn: 'Can I expand the system with additional solar panels?',
    questionZh: '我可以用额外的太阳能板扩展系统吗？',
    answerEn: 'Yes, the LE Solar Generator supports expandable solar input up to 1200W. You can add more solar panels to increase charging speed and overall system capacity based on your needs.',
    answerZh: '是的，LE太阳能发电机支持可扩展的太阳能输入，最高1200W。您可以根据需要添加更多太阳能板来提高充电速度和整体系统容量。'
  },
  {
    id: 8,
    questionEn: 'Is installation complicated?',
    questionZh: '安装复杂吗？',
    answerEn: 'No, the LE Solar Generator is designed for easy setup. It comes with clear instructions and all necessary cables. Most users can have it running within 30 minutes. Professional installation is available if needed.',
    answerZh: '不复杂，LE太阳能发电机设计简单易用。配有清晰的说明和所有必要的电缆。大多数用户可以在30分钟内完成设置。如需要，我们提供专业安装服务。'
  },
  {
    id: 9,
    questionEn: 'What safety features does it have?',
    questionZh: '它有哪些安全功能？',
    answerEn: 'The LE Solar Generator includes multiple safety features: BMS (Battery Management System), overcharge protection, over-discharge protection, short circuit protection, over-temperature protection, and pure sine wave output for sensitive electronics.',
    answerZh: 'LE太阳能发电机包含多种安全功能：BMS(电池管理系统)、过充保护、过放保护、短路保护、过温保护，以及为敏感电子设备提供纯正弦波输出。'
  },
  {
    id: 10,
    questionEn: 'How do I get technical support?',
    questionZh: '如何获得技术支持？',
    answerEn: 'We provide comprehensive technical support through multiple channels: email support, phone support, live chat, and video calls. Our technical team is available 24/7 to help with any questions or issues.',
    answerZh: '我们通过多种渠道提供全面的技术支持：邮件支持、电话支持、在线聊天和视频通话。我们的技术团队24/7全天候为您解答任何问题或解决任何问题。'
  }
]

export default function FAQPage() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'zh'>('en')
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState<number[]>([])

  const getLocalizedText = (en: string, zh: string) => {
    return currentLanguage === 'en' ? en : zh
  }

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const filteredFAQs = faqData.filter(faq => {
    const searchLower = searchTerm.toLowerCase()
    return (
      faq.questionEn.toLowerCase().includes(searchLower) ||
      faq.questionZh.toLowerCase().includes(searchLower) ||
      faq.answerEn.toLowerCase().includes(searchLower) ||
      faq.answerZh.toLowerCase().includes(searchLower)
    )
  })

  return (
    <>
      <Head>
        <title>FAQ - Lelink Solar</title>
        <meta name="description" content="Frequently Asked Questions about LE Solar Generator Series" />
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {getLocalizedText('Frequently Asked Questions', '常见问题')}
                </h1>
                <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                  {getLocalizedText(
                    'Find answers to common questions about our LE Solar Generator Series.',
                    '查找关于我们LE太阳能发电机系列的常见问题答案。'
                  )}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Language Switcher and Search */}
          <section className="py-8 bg-slate-800/50 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Language Switcher */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-1">
                    <button
                      onClick={() => setCurrentLanguage('en')}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        currentLanguage === 'en' 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setCurrentLanguage('zh')}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        currentLanguage === 'zh' 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      中文
                    </button>
                  </div>
                </div>

                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={getLocalizedText('Search FAQ...', '搜索常见问题...')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm">
                      <CardHeader 
                        className="cursor-pointer hover:bg-slate-700/30 transition-colors"
                        onClick={() => toggleItem(faq.id)}
                      >
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-white">
                            {getLocalizedText(faq.questionEn, faq.questionZh)}
                          </CardTitle>
                          {openItems.includes(faq.id) ? (
                            <ChevronUp className="h-5 w-5 text-blue-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-blue-400" />
                          )}
                        </div>
                      </CardHeader>
                      {openItems.includes(faq.id) && (
                        <CardContent className="pt-0">
                          <p className="text-gray-300 leading-relaxed">
                            {getLocalizedText(faq.answerEn, faq.answerZh)}
                          </p>
                          {faq.hasGuide && (
                            <div className="mt-4">
                              <Link 
                                href="/support/solar-inverter-guide"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                <FileText className="w-4 h-4 mr-2" />
                                {getLocalizedText('View Detailed Guide', '查看详细指南', currentLanguage)}
                              </Link>
                            </div>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">
                    {getLocalizedText('No FAQ items found matching your search.', '没有找到匹配您搜索的常见问题。')}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Contact Support Section */}
          <section className="py-16 bg-slate-800/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  {getLocalizedText('Still Have Questions?', '还有问题吗？')}
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  {getLocalizedText(
                    'Our support team is here to help you with any questions or concerns.',
                    '我们的支持团队随时为您解答任何问题或疑虑。'
                  )}
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <MessageCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {getLocalizedText('Live Chat', '在线聊天')}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {getLocalizedText('Get instant answers from our support team.', '从我们的支持团队获得即时答案。')}
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        {getLocalizedText('Start Chat', '开始聊天')}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <Phone className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {getLocalizedText('Phone Support', '电话支持')}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {getLocalizedText('Call us for immediate assistance.', '致电我们获得即时帮助。')}
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        {getLocalizedText('Call Now', '立即致电')}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <Mail className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {getLocalizedText('Email Support', '邮件支持')}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {getLocalizedText('Send us your questions via email.', '通过邮件向我们发送您的问题。')}
                      </p>
                      <Link href="/contact">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          {getLocalizedText('Send Email', '发送邮件')}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
