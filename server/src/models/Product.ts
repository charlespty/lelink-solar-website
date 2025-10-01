import mongoose, { Schema } from 'mongoose'
import { IProduct, IProductSpecification } from '../types'

const ProductSpecificationSchema = new Schema<IProductSpecification>({
  name: { type: String, required: true },
  nameEn: { type: String, required: true },
  nameZh: { type: String, required: true },
  nameFr: { type: String, required: true },
  nameEs: { type: String, required: true },
  nameAr: { type: String, required: true },
  value: { type: String, required: true },
  valueEn: { type: String, required: true },
  valueZh: { type: String, required: true },
  valueFr: { type: String, required: true },
  valueEs: { type: String, required: true },
  valueAr: { type: String, required: true },
  unit: { type: String }
}, { _id: false })

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  nameEn: { type: String, required: true },
  nameZh: { type: String, required: true },
  nameFr: { type: String, required: true },
  nameEs: { type: String, required: true },
  nameAr: { type: String, required: true },
  category: {
    type: String,
    enum: ['portable-solar-generator', 'home-backup-system', 'solar-panel-accessories'],
    required: true
  },
  description: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionZh: { type: String, required: true },
  descriptionFr: { type: String, required: true },
  descriptionEs: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  images: [{ type: String }],
  specifications: [ProductSpecificationSchema],
  features: [{ type: String }],
  featuresEn: [{ type: String }],
  featuresZh: [{ type: String }],
  featuresFr: [{ type: String }],
  featuresEs: [{ type: String }],
  featuresAr: [{ type: String }],
  price: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  inStock: { type: Boolean, default: true },
  tags: [{ type: String }]
}, {
  timestamps: true
})

// Indexes
ProductSchema.index({ category: 1 })
ProductSchema.index({ inStock: 1 })
ProductSchema.index({ tags: 1 })
ProductSchema.index({ nameEn: 'text', nameZh: 'text', descriptionEn: 'text', descriptionZh: 'text' })

export default mongoose.model<IProduct>('Product', ProductSchema)
