import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { failResponse, successResponse } from '../../../core/shared/Response'
import { Types } from '../../../di/types'
import Sanitizer from '../../validators/Common/Sanitizer'
import { CalculateQuoteUseCase } from './CalculateQuoteUseCase'

@injectable()
export class CalculateQuoteController {
	constructor(
		@inject(Types.CalculateQuoteUseCase)
		private calculateQuoteUseCase: CalculateQuoteUseCase,
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const age = Sanitizer.sanitizeNumber(req.body.age)
			const occupationCode = Sanitizer.sanitizeString(req.body.occupationCode)
			const capital = Sanitizer.sanitizeNumber(req.body.capital)
			const coverages = Sanitizer.sanitizeStringList(req.body.coverages)

			if (!age) throw new ValidationError('Idade é obrigatória')
			if (!occupationCode) throw new ValidationError('Ocupação é obrigatória')
			if (!capital) throw new ValidationError('Capital é obrigatório')
			if (!coverages.length) throw new ValidationError('Ao menos uma cobertura é obrigatória')

			const result = await this.calculateQuoteUseCase.execute({ age, occupationCode, capital, coverages })

			return res.status(StatusCodes.OK).json(successResponse(result))
		} catch (err) {
			if (err instanceof ValidationError) return res.status(err.statusCode).json(failResponse(err.message, err.statusCode))
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(failResponse('Um erro interno ocorreu'))
		}
	}
}
