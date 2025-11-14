import jwt from 'jsonwebtoken'
import { config } from '../config/env'

export const generateToken = (payload: { id: string; email: string }): string => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: '7d'
  })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, config.jwtSecret)
  } catch (error) {
    return null
  }
}
