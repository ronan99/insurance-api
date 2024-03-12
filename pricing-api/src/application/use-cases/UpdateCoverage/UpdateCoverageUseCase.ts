import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { Types } from '../../../di/types'
import { ICoverageRepository } from '../../../domain/repositories/ICoverageRepository'
import { IUpdateCoverageRequestDTO, IUpdateCoverageResponseDTO } from './UpdateCoverageDTO'

@injectable()
export class UpdateCoverageUseCase {
	constructor(
		@inject(Types.ICoverageRepository)
		private readonly coverageRepository: ICoverageRepository,
	) {}

	async execute(id: string, data: IUpdateCoverageRequestDTO): Promise<IUpdateCoverageResponseDTO> {
		const coverageAlreadyExists = await this.coverageRepository.findByIdWithDeleted(id)

		if (!coverageAlreadyExists) {
			throw new ValidationError('Cobertura não encontrada', StatusCodes.BAD_REQUEST)
		}
		let alreadyHasWithName = null
		if (data.name) {
			alreadyHasWithName = await this.coverageRepository.findByNameWithDeleted(data.name)
		}

		if (alreadyHasWithName && alreadyHasWithName.id != coverageAlreadyExists.id) throw new ValidationError('Já existe cobertura com esse nome', StatusCodes.CONFLICT)

		if (data.capital) coverageAlreadyExists.capital = data.capital
		if (data.premium) coverageAlreadyExists.premium = data.premium
		if (data.name) coverageAlreadyExists.name = data.name
		if (data.description) coverageAlreadyExists.description = data.description

		const result = await this.coverageRepository.update(coverageAlreadyExists, coverageAlreadyExists.id)

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
