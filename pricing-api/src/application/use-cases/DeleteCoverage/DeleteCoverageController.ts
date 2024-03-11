import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { failResponse, successResponse } from '../../../core/shared/Response'
import { Types } from '../../../di/types'
import { DeleteCoverageUseCase } from './DeleteCoverageUseCase'

@injectable()
export class DeleteCoverageController {
	constructor(
		@inject(Types.DeleteCoverageUseCase)
		private deleteCoverageUseCase: DeleteCoverageUseCase,
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.params

		if (!id) return res.status(StatusCodes.BAD_REQUEST).json(failResponse('Id obrigatório', StatusCodes.BAD_REQUEST))

		try {
			const result = await this.deleteCoverageUseCase.execute(id)

			return res.status(StatusCodes.OK).json(successResponse(result))
		} catch (err) {
			if (err instanceof ValidationError) return res.status(err.statusCode).json(failResponse(err.message, err.statusCode))
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(failResponse('Um erro interno ocorreu'))
		}
	}
}
