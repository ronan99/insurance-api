import { Router } from 'express'
import { createCoverageController } from '../use-cases/CreateCoverage'
import { deleteCoverageController } from '../use-cases/DeleteCoverage'
import { updateCoverageController } from '../use-cases/UpdateCoverage'

const router = Router()

router.post('/', (req, res) => createCoverageController.handle(req, res))
router.delete('/:id', (req, res) => deleteCoverageController.handle(req, res))
router.put('/', (req, res) => updateCoverageController.handle(req, res))

export default router
