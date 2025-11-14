import { Router } from 'express'
import settingsController from '../controllers/settingsController'
import { authMiddleware } from '../middleware/auth'

const router = Router()

router.get('/', authMiddleware, settingsController.getSettings.bind(settingsController))
router.put('/', authMiddleware, settingsController.updateSettings.bind(settingsController))

export default router
