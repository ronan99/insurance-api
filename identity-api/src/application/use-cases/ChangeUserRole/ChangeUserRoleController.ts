import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { failResponse, successResponse } from '../../../core/shared/Response'
import { Types } from '../../../di/types'
import { ChangeUserRoleUseCase } from './ChangeUserRoleUseCase'

@injectable()
export class ChangeUserRoleController {
	constructor(
		@inject(Types.ChangeUserRoleUseCase)
		private changeUserRoleUseCase: ChangeUserRoleUseCase,
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
		const { role } = req.body
		const { id } = req.params

		try {
			const result = await this.changeUserRoleUseCase.execute({ id, role })

			return res.status(StatusCodes.OK).json(successResponse(result))
		} catch (err) {
			if (err instanceof ValidationError) return res.status(err.statusCode).json(failResponse(err.message, err.statusCode))
			return res.status(500).json(failResponse('Um erro interno ocorreu'))
		}
	}
}
