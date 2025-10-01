import mongoose, { Schema } from 'mongoose'
import { IQuoteRequest } from '../types'

const QuoteRequestSchema = new Schema<IQuoteRequest>({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  company: { type: String },
  country: { type: String, required: true },
  productId: { type: String },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'quoted', 'closed'],
    default: 'pending'
  }
}, {
  timestamps: true
})

// Indexes
QuoteRequestSchema.index({ email: 1 })
QuoteRequestSchema.index({ status: 1 })
QuoteRequestSchema.index({ createdAt: -1 })

export default mongoose.model<IQuoteRequest>('QuoteRequest', QuoteRequestSchema)
