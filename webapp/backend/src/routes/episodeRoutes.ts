import { Router } from 'express'
import episodeController from '../controllers/episodeController'
import { authMiddleware } from '../middleware/auth'

const router = Router()

router.get('/all', authMiddleware, episodeController.getAllEpisodes.bind(episodeController))
router.get('/:type', authMiddleware, episodeController.getEpisodesByType.bind(episodeController))

export default router
