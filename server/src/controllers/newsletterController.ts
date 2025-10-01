import { Request, Response } from 'express'
import NewsletterSubscription from '../models/NewsletterSubscription'
import { sendEmail } from '../utils/email'
import { ApiResponse } from '../types'

export const subscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    // Check if email already exists
    const existingSubscription = await NewsletterSubscription.findOne({ email })
    
    if (existingSubscription) {
      if (existingSubscription.status === 'active') {
        return res.status(400).json({
          success: false,
          message: 'Email is already subscribed to our newsletter'
        })
      } else {
        // Reactivate subscription
        existingSubscription.status = 'active'
        existingSubscription.subscribedAt = new Date()
        existingSubscription.unsubscribedAt = undefined
        await existingSubscription.save()

        const response: ApiResponse = {
          success: true,
          data: existingSubscription,
          message: 'Newsletter subscription reactivated successfully'
        }
        return res.json(response)
      }
    }

    // Create new subscription
    const subscription = new NewsletterSubscription({ email })
    await subscription.save()

    // Send welcome email
    await sendEmail({
      to: email,
      subject: 'Welcome to Lelink Solar Newsletter!',
      html: `
        <h2>Welcome to Lelink Solar Newsletter!</h2>
        <p>Thank you for subscribing to our newsletter. You'll receive the latest updates about:</p>
        <ul>
          <li>New solar products and innovations</li>
          <li>Energy-saving tips and guides</li>
          <li>Industry news and trends</li>
          <li>Special offers and promotions</li>
        </ul>
        <p>If you wish to unsubscribe at any time, you can do so by clicking the unsubscribe link in any of our emails.</p>
        <p>Best regards,<br>Lelink Solar Team</p>
      `
    })

    const response: ApiResponse = {
      success: true,
      data: subscription,
      message: 'Successfully subscribed to newsletter'
    }

    res.status(201).json(response)
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to newsletter',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const unsubscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.params

    const subscription = await NewsletterSubscription.findOne({ email })
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our newsletter subscription list'
      })
    }

    if (subscription.status === 'unsubscribed') {
      return res.status(400).json({
        success: false,
        message: 'Email is already unsubscribed'
      })
    }

    subscription.status = 'unsubscribed'
    subscription.unsubscribedAt = new Date()
    await subscription.save()

    const response: ApiResponse = {
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    }

    res.json(response)
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe from newsletter',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const getNewsletterSubscribers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const status = req.query.status as string

    const filter: any = {}
    if (status) {
      filter.status = status
    }

    const skip = (page - 1) * limit

    const subscribers = await NewsletterSubscription.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await NewsletterSubscription.countDocuments(filter)

    const response: ApiResponse = {
      success: true,
      data: {
        subscribers,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    }

    res.json(response)
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch newsletter subscribers',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
