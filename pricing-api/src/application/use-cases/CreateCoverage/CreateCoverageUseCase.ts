import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { Types } from '../../../di/types'
import CoverageEntity from '../../../domain/entities/CoverageEntity'
import { ICoverageRepository } from '../../../domain/repositories/ICoverageRepository'
import { ICreateCoverageRequestDTO, ICreateCoverageResponseDTO } from './CreateCoverageDTO'

@injectable()
export class CreateCoverageUseCase {
	constructor(
		@inject(Types.ICoverageRepository)
		private readonly coverageRepository: ICoverageRepository,
	) {}

	async execute(data: ICreateCoverageRequestDTO): Promise<ICreateCoverageResponseDTO> {
		const coverageAlreadyExists = await this.coverageRepository.findByName(data.name)

		if (coverageAlreadyExists) {
			throw new ValidationError('Cobertura já existe com este nome', StatusCodes.CONFLICT)
		}
		const coverage = new CoverageEntity(data)

		const result = await this.coverageRepository.save(coverage)

		return {
			coverageId: result.id,
			name: result.name,
			description: result.description,
			capital: result.capital,
			premium: result.premium,
		}
	}
}
