import { Router } from 'express'
import filterController from '../controllers/filterController'
import { authMiddleware } from '../middleware/auth'

const router = Router()

router.get('/', authMiddleware, filterController.getFilters.bind(filterController))
router.post('/', authMiddleware, filterController.addFilter.bind(filterController))
router.delete('/:id', authMiddleware, filterController.removeFilter.bind(filterController))

export default router
