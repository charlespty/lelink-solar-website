// Google Analytics 4 配置
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// 页面浏览跟踪
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// 事件跟踪
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// 产品相关事件
export const trackProductView = (productId: string, productName: string) => {
  event({
    action: 'view_item',
    category: 'ecommerce',
    label: `${productId} - ${productName}`,
  })
}

export const trackQuoteRequest = (productId: string) => {
  event({
    action: 'generate_lead',
    category: 'engagement',
    label: `Quote Request - ${productId}`,
  })
}

export const trackCalculatorUse = (powerOutput: number) => {
  event({
    action: 'calculate',
    category: 'engagement',
    label: 'Power Calculator',
    value: powerOutput,
  })
}

export const trackContactForm = (formType: string) => {
  event({
    action: 'submit',
    category: 'engagement',
    label: `Contact Form - ${formType}`,
  })
}

// 声明 gtag 类型
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}
