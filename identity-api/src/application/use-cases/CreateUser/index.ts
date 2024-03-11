import { container } from '../../../di/container'
import { Types } from '../../../di/types'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'

const createUserController: CreateUserController = container.get<CreateUserController>(Types.CreateUserController)
const createUserUseCase: CreateUserUseCase = container.get<CreateUserUseCase>(Types.CreateUserUseCase)

export { createUserController, createUserUseCase }
