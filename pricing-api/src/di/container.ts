import 'reflect-metadata'

import { Container } from 'inversify'

import { CreateCoverageController } from '../application/use-cases/CreateCoverage/CreateCoverageController'
import { CreateCoverageUseCase } from '../application/use-cases/CreateCoverage/CreateCoverageUseCase'
import { DeleteCoverageController } from '../application/use-cases/DeleteCoverage/DeleteCoverageController'
import { DeleteCoverageUseCase } from '../application/use-cases/DeleteCoverage/DeleteCoverageUseCase'
import { UpdateCoverageController } from '../application/use-cases/UpdateCoverage/UpdateCoverageController'
import { UpdateCoverageUseCase } from '../application/use-cases/UpdateCoverage/UpdateCoverageUseCase'
import { ICoverageRepository } from '../domain/repositories/ICoverageRepository'
import { InMemoryCoverageRepository } from '../domain/repositories/Implementations/InMemory/InMemoryCoverageRepository'
import { Types } from './types'

export const container = new Container({ defaultScope: 'Singleton' })

// container.bind<IUserRepository>(Types.IUserRepository).to(PrismaUserRepository)
container.bind<ICoverageRepository>(Types.ICoverageRepository).to(InMemoryCoverageRepository)

container.bind<CreateCoverageController>(Types.CreateCoverageController).to(CreateCoverageController)
container.bind<UpdateCoverageController>(Types.UpdateCoverageController).to(UpdateCoverageController)
container.bind<DeleteCoverageController>(Types.DeleteCoverageController).to(DeleteCoverageController)

container.bind<CreateCoverageUseCase>(Types.CreateCoverageUseCase).to(CreateCoverageUseCase)
container.bind<UpdateCoverageUseCase>(Types.UpdateCoverageUseCase).to(UpdateCoverageUseCase)
container.bind<DeleteCoverageUseCase>(Types.DeleteCoverageUseCase).to(DeleteCoverageUseCase)
