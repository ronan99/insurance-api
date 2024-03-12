import { Router } from 'express'
import { calculateQuoteController } from '../use-cases/CalculateQuote'
import { createCoverageController } from '../use-cases/CreateCoverage'
import { deleteCoverageController } from '../use-cases/DeleteCoverage'
import { updateCoverageController } from '../use-cases/UpdateCoverage'

const router = Router()

router.post('/coverage', (req, res) => createCoverageController.handle(req, res))
router.delete('/coverage/:id', (req, res) => deleteCoverageController.handle(req, res))
router.put('/coverage/:id', (req, res) => updateCoverageController.handle(req, res))
router.post('/quote', (req, res) => calculateQuoteController.handle(req, res))

export default router
