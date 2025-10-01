import { Request } from 'express'
import { Document } from 'mongoose'

// User Types
export interface IUser extends Document {
  _id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Product Types
export interface IProduct extends Document {
  _id: string
  name: string
  nameEn: string
  nameZh: string
  nameFr: string
  nameEs: string
  nameAr: string
  category: 'portable-solar-generator' | 'home-backup-system' | 'solar-panel-accessories'
  description: string
  descriptionEn: string
  descriptionZh: string
  descriptionFr: string
  descriptionEs: string
  descriptionAr: string
  images: string[]
  specifications: IProductSpecification[]
  features: string[]
  featuresEn: string[]
  featuresZh: string[]
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

export interface IProductSpecification {
  name: string
  nameEn: string
  nameZh: string
  nameFr: string
  nameEs: string
  nameAr: string
  value: string
  valueEn: string
  valueZh: string
  valueFr: string
  valueEs: string
  valueAr: string
  unit?: string
}

// Solution Types
export interface ISolution extends Document {
  _id: string
  title: string
  titleEn: string
  titleZh: string
  titleFr: string
  titleEs: string
  titleAr: string
  description: string
  descriptionEn: string
  descriptionZh: string
  descriptionFr: string
  descriptionEs: string
  descriptionAr: string
  image: string
  products: string[]
  features: string[]
  featuresEn: string[]
  featuresZh: string[]
  featuresFr: string[]
  featuresEs: string[]
  featuresAr: string[]
  useCases: string[]
  useCasesEn: string[]
  useCasesZh: string[]
  useCasesFr: string[]
  useCasesEs: string[]
  useCasesAr: string[]
  createdAt: Date
  updatedAt: Date
}

// Quote Request Types
export interface IQuoteRequest extends Document {
  _id: string
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

// Newsletter Subscription Types
export interface INewsletterSubscription extends Document {
  _id: string
  email: string
  status: 'active' | 'unsubscribed'
  subscribedAt: Date
  unsubscribedAt?: Date
}

// Article Types
export interface IArticle extends Document {
  _id: string
  title: string
  titleEn: string
  titleZh: string
  titleFr: string
  titleEs: string
  titleAr: string
  slug: string
  excerpt: string
  excerptEn: string
  excerptZh: string
  excerptFr: string
  excerptEs: string
  excerptAr: string
  content: string
  contentEn: string
  contentZh: string
  contentFr: string
  contentEs: string
  contentAr: string
  featuredImage: string
  category: 'solar-knowledge' | 'product-guide' | 'installation' | 'maintenance' | 'news'
  tags: string[]
  published: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

// Appliance Types (for Power Calculator)
export interface IAppliance {
  id: string
  name: string
  nameEn: string
  nameZh: string
  nameFr: string
  nameEs: string
  nameAr: string
  power: number
  hours: number
  quantity: number
  category: 'lighting' | 'kitchen' | 'entertainment' | 'communication' | 'cooling' | 'heating' | 'other'
}

// API Response Types
export interface ApiResponse<T = any> {
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

// Request Types
export interface AuthRequest extends Request {
  user?: IUser
}

// JWT Payload
export interface JWTPayload {
  userId: string
  email: string
  role: string
}

// File Upload Types
export interface UploadedFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  size: number
  destination: string
  filename: string
  path: string
  buffer: Buffer
}

// Email Types
export interface EmailData {
  to: string
  subject: string
  text?: string
  html?: string
  template?: string
  context?: Record<string, any>
}
