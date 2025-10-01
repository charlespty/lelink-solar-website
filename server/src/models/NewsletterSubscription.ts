import mongoose, { Schema } from 'mongoose'
import { INewsletterSubscription } from '../types'

const NewsletterSubscriptionSchema = new Schema<INewsletterSubscription>({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active'
  },
  subscribedAt: { type: Date, default: Date.now },
  unsubscribedAt: { type: Date }
}, {
  timestamps: true
})

// Indexes
NewsletterSubscriptionSchema.index({ email: 1 })
NewsletterSubscriptionSchema.index({ status: 1 })

export default mongoose.model<INewsletterSubscription>('NewsletterSubscription', NewsletterSubscriptionSchema)
