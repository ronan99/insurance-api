import { container } from '../../../di/container'
import { Types } from '../../../di/types'
import { DeleteCoverageController } from './DeleteCoverageController'
import { DeleteCoverageUseCase } from './DeleteCoverageUseCase'

const deleteCoverageController: DeleteCoverageController = container.get<DeleteCoverageController>(Types.DeleteCoverageController)
const deleteCoverageUseCase: DeleteCoverageUseCase = container.get<DeleteCoverageUseCase>(Types.DeleteCoverageUseCase)

export { deleteCoverageController, deleteCoverageUseCase }
