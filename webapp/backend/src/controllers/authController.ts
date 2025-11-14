import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../config/database'
import { generateToken } from '../utils/jwt'
import { AuthRequest } from '../types'

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, username, password } = req.body

      // Validate input
      if (!email || !username || !password) {
        return res.status(400).json({ message: 'Alle Felder sind erforderlich' })
      }

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        return res.status(400).json({ message: 'Benutzer existiert bereits' })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword
        },
        select: {
          id: true,
          email: true,
          username: true
        }
      })

      // Create default settings
      await prisma.userSettings.create({
        data: {
          userId: user.id
        }
      })

      // Generate token
      const token = generateToken({ id: user.id, email: user.email })

      res.status(201).json({
        user,
        token
      })
    } catch (error) {
      console.error('Register error:', error)
      res.status(500).json({ message: 'Interner Serverfehler' })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'E-Mail und Passwort sind erforderlich' })
      }

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          username: true,
          password: true
        }
      })

      if (!user) {
        return res.status(401).json({ message: 'Ungültige Anmeldedaten' })
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Ungültige Anmeldedaten' })
      }

      // Generate token
      const token = generateToken({ id: user.id, email: user.email })

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user

      res.json({
        user: userWithoutPassword,
        token
      })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({ message: 'Interner Serverfehler' })
    }
  }

  async getCurrentUser(req: AuthRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        select: {
          id: true,
          email: true,
          username: true
        }
      })

      if (!user) {
        return res.status(404).json({ message: 'Benutzer nicht gefunden' })
      }

      res.json(user)
    } catch (error) {
      console.error('Get current user error:', error)
      res.status(500).json({ message: 'Interner Serverfehler' })
    }
  }
}

export default new AuthController()
