import 'reflect-metadata'

import { Container } from 'inversify'
import { ChangeUserRoleController } from '../application/use-cases/ChangeUserRole/ChangeUserRoleController'
import { CreateUserController } from '../application/use-cases/CreateUser/CreateUserController'
import { CreateUserUseCase } from '../application/use-cases/CreateUser/CreateUserUseCase'

import { ChangeUserRoleUseCase } from '../application/use-cases/ChangeUserRole/ChangeUserRoleUseCase'
import { LoginController } from '../application/use-cases/Login/LoginController'
import { LoginUseCase } from '../application/use-cases/Login/LoginUseCase'
import { IUserRepository } from '../domain/repositories/IUserRepository'
import { PrismaUserRepository } from '../domain/repositories/Implementations/Prisma/PrismaUserRepository'
import { Types } from './types'

export const container = new Container({ defaultScope: 'Singleton' })

container.bind<IUserRepository>(Types.IUserRepository).to(PrismaUserRepository)
// container.bind<IUserRepository>(Types.IUserRepository).to(InMemoryUserRepository)

container.bind<ChangeUserRoleController>(Types.ChangeUserRoleController).to(ChangeUserRoleController)
container.bind<CreateUserController>(Types.CreateUserController).to(CreateUserController)
container.bind<LoginController>(Types.LoginController).to(LoginController)

container.bind<ChangeUserRoleUseCase>(Types.ChangeUserRoleUseCase).to(ChangeUserRoleUseCase)
container.bind<CreateUserUseCase>(Types.CreateUserUseCase).to(CreateUserUseCase)
container.bind<LoginUseCase>(Types.LoginUseCase).to(LoginUseCase)
