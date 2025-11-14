import express from 'express'
import cors from 'cors'
import { config } from './config/env'
import authRoutes from './routes/authRoutes'
import episodeRoutes from './routes/episodeRoutes'
import filterRoutes from './routes/filterRoutes'
import settingsRoutes from './routes/settingsRoutes'

const app = express()

// Middleware
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/episodes', episodeRoutes)
app.use('/api/filters', filterRoutes)
app.use('/api/settings', settingsRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route nicht gefunden' })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    message: err.message || 'Interner Serverfehler'
  })
})

const PORT = config.port

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`)
  console.log(`📊 Environment: ${config.nodeEnv}`)
  console.log(`🌐 CORS Origin: ${config.corsOrigin}`)
})
