import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { failResponse, successResponse } from '../../../core/shared/Response'
import { Types } from '../../../di/types'
import { IUpdateCoverageRequestDTO } from './UpdateCoverageDTO'
import { UpdateCoverageUseCase } from './UpdateCoverageUseCase'

@injectable()
export class UpdateCoverageController {
	constructor(
		@inject(Types.UpdateCoverageUseCase)
		private updateCoverageUseCase: UpdateCoverageUseCase,
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
		const data = req.body as IUpdateCoverageRequestDTO

		try {
			const result = await this.updateCoverageUseCase.execute(data)

			return res.status(StatusCodes.OK).json(successResponse(result))
		} catch (err) {
			if (err instanceof ValidationError) return res.status(err.statusCode).json(failResponse(err.message, err.statusCode))
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(failResponse('Um erro interno ocorreu'))
		}
	}
}
