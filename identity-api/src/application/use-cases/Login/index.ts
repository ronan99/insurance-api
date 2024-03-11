import { container } from '../../../di/container'
import { Types } from '../../../di/types'
import { LoginController } from './LoginController'
import { LoginUseCase } from './LoginUseCase'

const loginController: LoginController = container.get<LoginController>(Types.LoginController)
const loginUseCase: LoginUseCase = container.get<LoginUseCase>(Types.LoginUseCase)

export { loginController, loginUseCase }
