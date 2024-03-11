import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { failResponse, successResponse } from '../../../core/shared/Response'
import { Types } from '../../../di/types'
import { LoginUseCase } from './LoginUseCase'

@injectable()
export class LoginController {
	constructor(
		@inject(Types.LoginUseCase)
		private loginUseCase: LoginUseCase,
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
		const { username, password } = req.body

		try {
			const result = await this.loginUseCase.execute({ username, password })

			return res.status(StatusCodes.CREATED).json(successResponse(result))
		} catch (err) {
			if (err instanceof ValidationError) return res.status(err.statusCode).json(failResponse(err.message, err.statusCode))
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(failResponse('Um erro interno ocorreu'))
		}
	}
}
