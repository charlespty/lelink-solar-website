import { Router } from 'express'
import { subscribeNewsletter, unsubscribeNewsletter, getNewsletterSubscribers } from '../controllers/newsletterController'
import { authenticateToken, requireAdmin } from '../middleware/auth'
import { validateRequest, newsletterSubscriptionSchema } from '../middleware/validation'

const router = Router()

// Public routes
router.post('/subscribe', validateRequest(newsletterSubscriptionSchema), subscribeNewsletter)
router.delete('/unsubscribe/:email', unsubscribeNewsletter)

// Protected routes (Admin only)
router.get('/subscribers', authenticateToken, requireAdmin, getNewsletterSubscribers)

export default router
