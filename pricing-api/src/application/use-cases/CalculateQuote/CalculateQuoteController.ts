import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { failResponse, successResponse } from '../../../core/shared/Response'
import { Types } from '../../../di/types'
import { ICalculateQuoteRequestDTO } from './CalculateQuoteDTO'
import { CalculateQuoteUseCase } from './CalculateQuoteUseCase'

@injectable()
export class CalculateQuoteController {
	constructor(
		@inject(Types.CalculateQuoteUseCase)
		private calculateQuoteUseCase: CalculateQuoteUseCase,
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
		const data = req.body as ICalculateQuoteRequestDTO

		try {
			const result = await this.calculateQuoteUseCase.execute(data)

			return res.status(StatusCodes.OK).json(successResponse(result))
		} catch (err) {
			if (err instanceof ValidationError) return res.status(err.statusCode).json(failResponse(err.message, err.statusCode))
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(failResponse('Um erro interno ocorreu'))
		}
	}
}