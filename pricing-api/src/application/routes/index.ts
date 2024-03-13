import { Router } from 'express'
import AdminAuth from '../../core/middleware/AdminAuth'
import UserAuth from '../../core/middleware/UserAuth'
import { calculateQuoteController } from '../use-cases/CalculateQuote'
import { createCoverageController } from '../use-cases/CreateCoverage'
import { deleteCoverageController } from '../use-cases/DeleteCoverage'
import { updateCoverageController } from '../use-cases/UpdateCoverage'

const router = Router()

router.post('/coverage', AdminAuth, (req, res) => createCoverageController.handle(req, res))
router.delete('/coverage/:id', AdminAuth, (req, res) => deleteCoverageController.handle(req, res))
router.put('/coverage/:id', AdminAuth, (req, res) => updateCoverageController.handle(req, res))
router.get('/quote', UserAuth, (req, res) => calculateQuoteController.handle(req, res))

export default router
