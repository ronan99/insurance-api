import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { failResponse, successResponse } from '../../../core/shared/Response'
import { Types } from '../../../di/types'
import Sanitizer from '../../validators/Common/Sanitizer'
import { CreateUserUseCase } from './CreateUserUseCase'

@injectable()
export class CreateUserController {
	constructor(
		@inject(Types.CreateUserUseCase)
		private createUserUseCase: CreateUserUseCase,
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
		const { username, password, role } = req.body
		try {
			const result = await this.createUserUseCase.execute({ username: Sanitizer.sanitizeString(username), password, role })

			return res.status(StatusCodes.CREATED).json(successResponse(result))
		} catch (err) {
			if (err instanceof ValidationError) return res.status(err.statusCode).json(failResponse(err.message, err.statusCode))
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(failResponse('Um erro interno ocorreu'))
		}
	}
}
