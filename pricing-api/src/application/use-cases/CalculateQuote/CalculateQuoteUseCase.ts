import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { Types } from '../../../di/types'
import AgeFactorEntity from '../../../domain/entities/AgeFactorEntity'
import CoverageEntity from '../../../domain/entities/CoverageEntity'
import OccupationEntity from '../../../domain/entities/OccupationEntity'
import { ICoverageRepository } from '../../../domain/repositories/ICoverageRepository'
import { IOccupationRepository } from '../../../domain/repositories/IOccupationRepository'
import AgeFactor from '../../util/AgeFactor'
import NumberRounding from '../../util/NumberRounding'
import { ICalculateQuoteRequestDTO, ICalculateQuoteResponseDTO } from './CalculateQuoteDTO'

@injectable()
export class CalculateQuoteUseCase {
	constructor(
		@inject(Types.ICoverageRepository)
		private readonly coverageRepository: ICoverageRepository,

		@inject(Types.IOccupationRepository)
		private readonly occupationRepository: IOccupationRepository,
	) {}

	async execute(data: ICalculateQuoteRequestDTO): Promise<ICalculateQuoteResponseDTO> {
		const occupation = await this.occupationRepository.findByCode(data.occupationCode)
		if (!occupation) throw new ValidationError('Código de ocupação não encotrado', StatusCodes.BAD_REQUEST)

		const coverages = await this.coverageRepository.findByIdList(data.coverages)
		if (!coverages) throw new ValidationError('Coberturas não encotradas', StatusCodes.BAD_REQUEST)

		const ageFactor = await AgeFactor.getFactor(data.age)
		if (!ageFactor) throw new ValidationError('Um problema ocorreu, contate o administrador', StatusCodes.INTERNAL_SERVER_ERROR)

		const result = this.calculateQuote(data, ageFactor, coverages, occupation)

		return result
	}

	private calculateQuote(data: ICalculateQuoteRequestDTO, ageFactor: AgeFactorEntity, coverages: CoverageEntity[], occupation: OccupationEntity): ICalculateQuoteResponseDTO {
		let totalPremium = 0.0
		let coveragesResult = []
		for (let coverage of coverages) {
			let coveragesPremium = Math.ceil(data.capital / coverage.capital) * coverage.premium * ageFactor.factor * occupation.factor
			coveragesResult.push({ coverageId: coverage.id, premium: NumberRounding.roundTo(coveragesPremium) })
			totalPremium += coveragesPremium
		}

		const result = {
			ageFactor: ageFactor.factor,
			occupationFactor: occupation.factor,
			coverages: coveragesResult,
			capital: NumberRounding.roundTo(data.capital),
			premium: NumberRounding.roundTo(totalPremium),
		}

		return result
	}
}
