import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { Types } from '../../../di/types'
import CoverageEntity from '../../../domain/entities/CoverageEntity'
import { ICoverageRepository } from '../../../domain/repositories/ICoverageRepository'
import { IUpdateCoverageRequestDTO, IUpdateCoverageResponseDTO } from './UpdateCoverageDTO'

@injectable()
export class UpdateCoverageUseCase {
	constructor(
		@inject(Types.ICoverageRepository)
		private readonly coverageRepository: ICoverageRepository,
	) {}

	async execute(data: IUpdateCoverageRequestDTO): Promise<IUpdateCoverageResponseDTO> {
		const coverageAlreadyExists = await this.coverageRepository.findByNameDeleted(data.name)

		if (!coverageAlreadyExists) {
			throw new ValidationError('Cobertura não encontrada', StatusCodes.BAD_REQUEST)
		}

		const coverage = new CoverageEntity(data)

		const result = await this.coverageRepository.update(coverage, coverageAlreadyExists.id)

		if (!result) throw new ValidationError('Um erro ocorreu ao atualizar a cobertura', StatusCodes.INTERNAL_SERVER_ERROR)

		return {
			coverageId: result.id,
			name: result.name,
			description: result.description,
			capital: result.capital,
			premium: result.premium,
		}
	}
}
