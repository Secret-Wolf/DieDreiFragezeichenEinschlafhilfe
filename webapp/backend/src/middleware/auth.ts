import { Response, NextFunction } from 'express'
import { AuthRequest } from '../types'
import { verifyToken } from '../utils/jwt'
import prisma from '../config/database'

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Nicht autorisiert' })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token) as any

    if (!decoded) {
      return res.status(401).json({ message: 'Ungültiger Token' })
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, username: true }
    })

    if (!user) {
      return res.status(401).json({ message: 'Benutzer nicht gefunden' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Nicht autorisiert' })
  }
}
