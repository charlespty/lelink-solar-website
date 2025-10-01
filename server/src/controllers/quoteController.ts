import { Request, Response } from 'express'
import QuoteRequest from '../models/QuoteRequest'
import { sendEmail } from '../utils/email'
import { ApiResponse } from '../types'

export const createQuoteRequest = async (req: Request, res: Response) => {
  try {
    const quoteRequest = new QuoteRequest(req.body)
    await quoteRequest.save()

    // Send notification email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@lelinksolar.com',
      subject: 'New Quote Request',
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${quoteRequest.name}</p>
        <p><strong>Email:</strong> ${quoteRequest.email}</p>
        <p><strong>Phone:</strong> ${quoteRequest.phone}</p>
        <p><strong>Company:</strong> ${quoteRequest.company || 'N/A'}</p>
        <p><strong>Country:</strong> ${quoteRequest.country}</p>
        <p><strong>Product ID:</strong> ${quoteRequest.productId || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${quoteRequest.message}</p>
      `
    })

    // Send confirmation email to customer
    await sendEmail({
      to: quoteRequest.email,
      subject: 'Quote Request Received - Lelink Solar',
      html: `
        <h2>Thank you for your interest in Lelink Solar!</h2>
        <p>Dear ${quoteRequest.name},</p>
        <p>We have received your quote request and our team will contact you within 24 hours.</p>
        <p>Your request details:</p>
        <ul>
          <li>Name: ${quoteRequest.name}</li>
          <li>Email: ${quoteRequest.email}</li>
          <li>Phone: ${quoteRequest.phone}</li>
          <li>Country: ${quoteRequest.country}</li>
        </ul>
        <p>Best regards,<br>Lelink Solar Team</p>
      `
    })

    const response: ApiResponse = {
      success: true,
      data: quoteRequest,
      message: 'Quote request submitted successfully'
    }

    res.status(201).json(response)
  } catch (error) {
    console.error('Error creating quote request:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit quote request',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const getQuoteRequests = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const status = req.query.status as string

    const filter: any = {}
    if (status) {
      filter.status = status
    }

    const skip = (page - 1) * limit

    const quoteRequests = await QuoteRequest.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await QuoteRequest.countDocuments(filter)

    const response: ApiResponse = {
      success: true,
      data: {
        quoteRequests,
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
    console.error('Error fetching quote requests:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quote requests',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const updateQuoteRequestStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const quoteRequest = await QuoteRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )

    if (!quoteRequest) {
      return res.status(404).json({
        success: false,
        message: 'Quote request not found'
      })
    }

    const response: ApiResponse = {
      success: true,
      data: quoteRequest,
      message: 'Quote request status updated successfully'
    }

    res.json(response)
  } catch (error) {
    console.error('Error updating quote request status:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update quote request status',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
