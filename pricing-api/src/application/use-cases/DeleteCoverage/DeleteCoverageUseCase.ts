import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { Types } from '../../../di/types'
import { ICoverageRepository } from '../../../domain/repositories/ICoverageRepository'
import { IDeleteCoverageResponseDTO } from './DeleteCoverageDTO'

@injectable()
export class DeleteCoverageUseCase {
	constructor(
		@inject(Types.ICoverageRepository)
		private readonly coverageRepository: ICoverageRepository,
	) {}

	async execute(id: string | number): Promise<IDeleteCoverageResponseDTO> {
		const coverage = await this.coverageRepository.findById(id)

		if (!coverage) throw new ValidationError('Cobertura não encontrada', StatusCodes.NOT_FOUND)

		const response = await this.coverageRepository.delete(coverage.id)

		return {
			success: response,
		}
	}
}
