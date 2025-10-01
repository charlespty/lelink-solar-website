import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest, JWTPayload } from '../types'

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    req.user = {
      _id: decoded.userId,
      email: decoded.email,
      role: decoded.role
    } as any
    next()
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    })
  }
}

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    })
  }
  next()
}
