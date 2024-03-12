import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { failResponse, successResponse } from '../../../core/shared/Response'
import { Types } from '../../../di/types'
import Sanitizer from '../../validators/Common/Sanitizer'
import CoverageValidator from '../../validators/CreateCoverage/CoverageValidator'
import { CreateCoverageUseCase } from './CreateCoverageUseCase'

@injectable()
export class CreateCoverageController {
	constructor(
		@inject(Types.CreateCoverageUseCase)
		private createCoverageUseCase: CreateCoverageUseCase,
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
		const capital = Sanitizer.sanitizeNumber(req.body.capital)
		const premium = Sanitizer.sanitizeNumber(req.body.premium)
		const name = Sanitizer.sanitizeString(req.body.name)
		const description = Sanitizer.sanitizeString(req.body.description)
		try {
			const validator = new CoverageValidator()
			validator.validateCapital(capital)
			validator.validatePremium(premium, capital)

			const result = await this.createCoverageUseCase.execute({ capital, premium, name, description })

			return res.status(StatusCodes.CREATED).json(successResponse(result))
		} catch (err) {
			if (err instanceof ValidationError) return res.status(err.statusCode).json(failResponse(err.message, err.statusCode))
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(failResponse('Um erro interno ocorreu'))
		}
	}
}
