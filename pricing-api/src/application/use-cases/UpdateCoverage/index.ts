import { container } from '../../../di/container'
import { Types } from '../../../di/types'
import { UpdateCoverageController } from './UpdateCoverageController'
import { UpdateCoverageUseCase } from './UpdateCoverageUseCase'

const updateCoverageController: UpdateCoverageController = container.get<UpdateCoverageController>(Types.UpdateCoverageController)
const updateCoverageUseCase: UpdateCoverageUseCase = container.get<UpdateCoverageUseCase>(Types.UpdateCoverageUseCase)

export { updateCoverageController, updateCoverageUseCase }
