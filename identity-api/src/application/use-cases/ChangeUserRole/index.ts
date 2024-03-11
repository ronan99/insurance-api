import { container } from '../../../di/container'
import { Types } from '../../../di/types'
import { ChangeUserRoleController } from './ChangeUserRoleController'
import { ChangeUserRoleUseCase } from './ChangeUserRoleUseCase'

const changeUserRoleController: ChangeUserRoleController = container.get<ChangeUserRoleController>(Types.ChangeUserRoleController)
const changeUserRoleUseCase: ChangeUserRoleUseCase = container.get<ChangeUserRoleUseCase>(Types.ChangeUserRoleUseCase)

export { changeUserRoleController, changeUserRoleUseCase }
