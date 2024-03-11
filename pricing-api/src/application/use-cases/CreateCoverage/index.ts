import { container } from '../../../di/container'
import { Types } from '../../../di/types'
import { CreateCoverageController } from './CreateCoverageController'
import { CreateCoverageUseCase } from './CreateCoverageUseCase'

const createCoverageController: CreateCoverageController = container.get<CreateCoverageController>(Types.CreateCoverageController)
const createCoverageUseCase: CreateCoverageUseCase = container.get<CreateCoverageUseCase>(Types.CreateCoverageUseCase)

export { createCoverageController, createCoverageUseCase }
