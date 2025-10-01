// 多语言支持工具

export type Language = 'en' | 'zh' | 'fr' | 'es' | 'ar'

export interface Translation {
  [key: string]: string | Translation
}

// 英文翻译
export const enTranslations: Translation = {
  // Navigation
  'nav.home': 'Home',
  'nav.products': 'Products',
  'nav.calculator': 'Power Calculator',
  'nav.about': 'About Us',
  'nav.support': 'Support',
  'nav.contact': 'Contact',
  'nav.faq': 'FAQ',
  
  // Hero Section
  'hero.title': 'Power Your Future with Solar Energy',
  'hero.subtitle': 'Professional solar generator solutions for homes, businesses, and outdoor adventures',
  'hero.description': 'Clean, reliable, and sustainable power wherever you need it. Experience the future of energy independence.',
  'hero.cta.primary': 'Explore Products',
  'hero.cta.secondary': 'Get Quote',
  
  // Products
  'products.title': 'LE Solar Generator Series',
  'products.subtitle': 'Advanced solar power solutions designed for reliability, efficiency, and versatility',
  'products.description': 'The LE Solar Generator Series offers versatile, high-capacity portable power solutions designed for ultimate reliability and efficiency.',
  'products.cta.explore': 'Explore Product Details',
  'products.cta.quote': 'Request a Quote',
  
  // Features
  'features.pure_sine': 'Pure Sine Wave Output',
  'features.solar_charging': 'High-Efficiency Solar Charging',
  'features.battery_management': 'Advanced Battery Management',
  'features.protection': 'Comprehensive Protection',
  
  // Applications
  'applications.home': 'Home Energy Backup',
  'applications.outdoor': 'Outdoor Adventures',
  'applications.emergency': 'Emergency Preparedness',
  'applications.commercial': 'Commercial & Industrial',
  
  // Solutions
  'solutions.residential': 'Residential Solutions',
  'solutions.commercial': 'Commercial Solutions',
  'solutions.portable': 'Portable Power Solutions',
  'solutions.custom': 'Custom Solutions',
  
  // FAQ
  'faq.title': 'Frequently Asked Questions',
  'faq.subtitle': 'Find answers to the most common questions about our solar generators and services',
  'faq.search': 'Search FAQs...',
  'faq.no_results': 'No FAQs found matching your search.',
  'faq.contact_title': 'Still Have Questions?',
  'faq.contact_description': 'If you cannot find the answer to your question in our FAQ, please do not hesitate to contact our support team.',
  'faq.contact_email': 'Email Us',
  'faq.contact_phone': 'Call Us',
  
  // Contact
  'contact.title': 'Get in Touch',
  'contact.subtitle': 'Ready to power your future with solar energy? Contact us today.',
  'contact.form.name': 'Full Name',
  'contact.form.email': 'Email Address',
  'contact.form.phone': 'Phone Number',
  'contact.form.company': 'Company',
  'contact.form.message': 'Message',
  'contact.form.submit': 'Send Message',
  'contact.info.title': 'Contact Information',
  'contact.info.address': 'Address',
  'contact.info.phone': 'Phone',
  'contact.info.email': 'Email',
  'contact.info.hours': 'Business Hours',
  
  // Footer
  'footer.description': 'Leading provider of professional solar generator solutions for homes, businesses, and outdoor adventures.',
  'footer.newsletter.title': 'Stay Updated',
  'footer.newsletter.description': 'Subscribe to our newsletter for the latest updates and offers.',
  'footer.newsletter.placeholder': 'Enter your email',
  'footer.newsletter.subscribe': 'Subscribe',
  'footer.copyright': '© 2024 Lelink Solar Tech Co., Ltd. All rights reserved.',
  
  // Common
  'common.loading': 'Loading...',
  'common.error': 'An error occurred',
  'common.success': 'Success',
  'common.cancel': 'Cancel',
  'common.save': 'Save',
  'common.edit': 'Edit',
  'common.delete': 'Delete',
  'common.view': 'View',
  'common.close': 'Close',
  'common.back': 'Back',
  'common.next': 'Next',
  'common.previous': 'Previous',
  'common.more': 'Learn More',
  'common.read_more': 'Read More',
  'common.less': 'Show Less',
}

// 中文翻译
export const zhTranslations: Translation = {
  // Navigation
  'nav.home': '首页',
  'nav.products': '产品',
  'nav.calculator': '功率计算器',
  'nav.about': '关于我们',
  'nav.support': '支持',
  'nav.contact': '联系我们',
  'nav.faq': '常见问题',
  
  // Hero Section
  'hero.title': '用太阳能点亮您的未来',
  'hero.subtitle': '为家庭、企业和户外探险提供专业的太阳能发电机解决方案',
  'hero.description': '清洁、可靠、可持续的电力，随时随地满足您的需求。体验能源独立的未来。',
  'hero.cta.primary': '探索产品',
  'hero.cta.secondary': '获取报价',
  
  // Products
  'products.title': 'LE 太阳能发电机系列',
  'products.subtitle': '先进的太阳能发电解决方案，专为可靠性、效率和多功能性而设计',
  'products.description': 'LE太阳能发电机系列提供多功能、大容量的便携式电源解决方案，旨在实现极致的可靠性和效率。',
  'products.cta.explore': '探索产品详情',
  'products.cta.quote': '获取报价',
  
  // Features
  'features.pure_sine': '纯正弦波输出',
  'features.solar_charging': '高效太阳能充电',
  'features.battery_management': '先进电池管理',
  'features.protection': '全面保护',
  
  // Applications
  'applications.home': '家庭能源备用',
  'applications.outdoor': '户外探险',
  'applications.emergency': '应急准备',
  'applications.commercial': '商业和工业用途',
  
  // Solutions
  'solutions.residential': '住宅解决方案',
  'solutions.commercial': '商业解决方案',
  'solutions.portable': '便携式电源解决方案',
  'solutions.custom': '定制解决方案',
  
  // FAQ
  'faq.title': '常见问题',
  'faq.subtitle': '查找有关我们太阳能发电机和服务的常见问题解答',
  'faq.search': '搜索常见问题...',
  'faq.no_results': '没有找到符合您搜索条件的常见问题。',
  'faq.contact_title': '还有其他问题吗？',
  'faq.contact_description': '如果您在我们的常见问题中找不到答案，请随时联系我们的支持团队。',
  'faq.contact_email': '给我们发邮件',
  'faq.contact_phone': '给我们打电话',
  
  // Contact
  'contact.title': '联系我们',
  'contact.subtitle': '准备用太阳能点亮您的未来吗？立即联系我们。',
  'contact.form.name': '姓名',
  'contact.form.email': '邮箱地址',
  'contact.form.phone': '电话号码',
  'contact.form.company': '公司',
  'contact.form.message': '留言',
  'contact.form.submit': '发送消息',
  'contact.info.title': '联系信息',
  'contact.info.address': '地址',
  'contact.info.phone': '电话',
  'contact.info.email': '邮箱',
  'contact.info.hours': '营业时间',
  
  // Footer
  'footer.description': '为家庭、企业和户外探险提供专业太阳能发电机解决方案的领先供应商。',
  'footer.newsletter.title': '保持更新',
  'footer.newsletter.description': '订阅我们的新闻通讯，获取最新更新和优惠。',
  'footer.newsletter.placeholder': '输入您的邮箱',
  'footer.newsletter.subscribe': '订阅',
  'footer.copyright': '© 2024 乐联太阳能科技有限公司。保留所有权利。',
  
  // Common
  'common.loading': '加载中...',
  'common.error': '发生错误',
  'common.success': '成功',
  'common.cancel': '取消',
  'common.save': '保存',
  'common.edit': '编辑',
  'common.delete': '删除',
  'common.view': '查看',
  'common.close': '关闭',
  'common.back': '返回',
  'common.next': '下一步',
  'common.previous': '上一步',
  'common.more': '了解更多',
  'common.read_more': '阅读更多',
  'common.less': '显示更少',
}

// 翻译映射
export const translations: Record<Language, Translation> = {
  en: enTranslations,
  zh: zhTranslations,
  fr: enTranslations, // 暂时使用英文，后续可以添加法文翻译
  es: enTranslations, // 暂时使用英文，后续可以添加西班牙文翻译
  ar: enTranslations, // 暂时使用英文，后续可以添加阿拉伯文翻译
}

// 获取翻译文本
export function getTranslation(key: string, language: Language = 'en'): string {
  const keys = key.split('.')
  let value: unknown = translations[language]
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k]
    } else {
      // 如果当前语言没有翻译，回退到英文
      value = translations.en
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = (value as Record<string, unknown>)[fallbackKey]
        } else {
          return key // 如果连英文都没有，返回key本身
        }
      }
      break
    }
  }
  
  return typeof value === 'string' ? value : key
}

// 语言配置
export const languageConfig = {
  en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
  zh: { name: '中文', flag: '🇨🇳', dir: 'ltr' },
  fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
}

// 获取支持的语言列表
export function getSupportedLanguages(): Language[] {
  return Object.keys(languageConfig) as Language[]
}

// 检测用户语言偏好
export function detectUserLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  
  const browserLang = navigator.language.split('-')[0]
  const supportedLangs = getSupportedLanguages()
  
  if (supportedLangs.includes(browserLang as Language)) {
    return browserLang as Language
  }
  
  return 'en'
}
