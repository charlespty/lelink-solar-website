// 产品相关类型
export interface Product {
  id: string
  name: string
  nameEn: string
  nameFr: string
  nameEs: string
  nameAr: string
  category: ProductCategory
  description: string
  descriptionEn: string
  descriptionFr: string
  descriptionEs: string
  descriptionAr: string
  images: string[]
  specifications: ProductSpecification[]
  features: string[]
  featuresEn: string[]
  featuresFr: string[]
  featuresEs: string[]
  featuresAr: string[]
  price: number
  currency: string
  inStock: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface ProductSpecification {
  name: string
  nameEn: string
  nameFr: string
  nameEs: string
  nameAr: string
  value: string
  valueEn: string
  valueFr: string
  valueEs: string
  valueAr: string
  unit?: string
}

export type ProductCategory = 
  | 'portable-solar-generator'
  | 'home-backup-system'
  | 'solar-panel-accessories'

// 解决方案相关类型
export interface Solution {
  id: string
  title: string
  titleEn: string
  titleFr: string
  titleEs: string
  titleAr: string
  description: string
  descriptionEn: string
  descriptionFr: string
  descriptionEs: string
  descriptionAr: string
  image: string
  products: string[] // Product IDs
  features: string[]
  featuresEn: string[]
  featuresFr: string[]
  featuresEs: string[]
  featuresAr: string[]
  useCases: string[]
  useCasesEn: string[]
  useCasesFr: string[]
  useCasesEs: string[]
  useCasesAr: string[]
  createdAt: Date
  updatedAt: Date
}

// 询价表单类型
export interface QuoteRequest {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  country: string
  productId?: string
  message: string
  status: 'pending' | 'contacted' | 'quoted' | 'closed'
  createdAt: Date
  updatedAt: Date
}

// 新闻订阅类型
export interface NewsletterSubscription {
  id: string
  email: string
  status: 'active' | 'unsubscribed'
  subscribedAt: Date
  unsubscribedAt?: Date
}

// 文章类型
export interface Article {
  id: string
  title: string
  titleEn: string
  titleFr: string
  titleEs: string
  titleAr: string
  slug: string
  excerpt: string
  excerptEn: string
  excerptFr: string
  excerptEs: string
  excerptAr: string
  content: string
  contentEn: string
  contentFr: string
  contentEs: string
  contentAr: string
  featuredImage: string
  category: ArticleCategory
  tags: string[]
  published: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export type ArticleCategory = 
  | 'solar-knowledge'
  | 'product-guide'
  | 'installation'
  | 'maintenance'
  | 'news'

// 功率计算器类型
export interface PowerCalculator {
  appliances: Appliance[]
  totalPower: number
  recommendedProducts: string[]
}

export interface Appliance {
  id: string
  name: string
  nameEn: string
  nameFr: string
  nameEs: string
  nameAr: string
  power: number // Watts
  hours: number
  quantity: number
  category: ApplianceCategory
}

export type ApplianceCategory = 
  | 'lighting'
  | 'kitchen'
  | 'entertainment'
  | 'communication'
  | 'cooling'
  | 'heating'
  | 'other'

// API响应类型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// 语言类型
export type Locale = 'en' | 'zh' | 'fr' | 'es' | 'ar'

// 导航类型
export interface NavigationItem {
  label: string
  labelEn: string
  labelFr: string
  labelEs: string
  labelAr: string
  href: string
  children?: NavigationItem[]
}

// 联系信息类型
export interface ContactInfo {
  address: string
  addressEn: string
  addressFr: string
  addressEs: string
  addressAr: string
  phone: string
  email: string
  whatsapp: string
  workingHours: string
  workingHoursEn: string
  workingHoursFr: string
  workingHoursEs: string
  workingHoursAr: string
}
