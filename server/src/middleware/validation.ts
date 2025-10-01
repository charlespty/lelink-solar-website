import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.details[0].message
      })
    }
    
    next()
  }
}

// Validation schemas
export const quoteRequestSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(20).required(),
  company: Joi.string().max(100).optional(),
  country: Joi.string().min(2).max(50).required(),
  productId: Joi.string().optional(),
  message: Joi.string().min(10).max(1000).required()
})

export const newsletterSubscriptionSchema = Joi.object({
  email: Joi.string().email().required()
})

export const contactFormSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(5).max(100).required(),
  message: Joi.string().min(10).max(1000).required()
})
