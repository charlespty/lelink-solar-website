import { Router } from 'express'
import { createQuoteRequest, getQuoteRequests, updateQuoteRequestStatus } from '../controllers/quoteController'
import { authenticateToken, requireAdmin } from '../middleware/auth'
import { validateRequest, quoteRequestSchema } from '../middleware/validation'

const router = Router()

// Public routes
router.post('/', validateRequest(quoteRequestSchema), createQuoteRequest)

// Protected routes (Admin only)
router.get('/', authenticateToken, requireAdmin, getQuoteRequests)
router.patch('/:id/status', authenticateToken, requireAdmin, updateQuoteRequestStatus)

export default router
