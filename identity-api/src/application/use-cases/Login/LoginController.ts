import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { failResponse, successResponse } from '../../../core/shared/Response'
import { Types } from '../../../di/types'
import Sanitizer from '../../validators/Common/Sanitizer'
import { LoginUseCase } from './LoginUseCase'

@injectable()
export class LoginController {
	constructor(
		@inject(Types.LoginUseCase)
		private loginUseCase: LoginUseCase,
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const username = Sanitizer.sanitizeString(req.body.username)
			const password = Sanitizer.sanitizeString(req.body.password)

			if (!username) throw new ValidationError('Nome de usuário é obrigatório')
			if (!password) throw new ValidationError('Senha é obrigatória')

			const result = await this.loginUseCase.execute({ username, password })

			return res.status(StatusCodes.CREATED).json(successResponse(result))
		} catch (err) {
			if (err instanceof ValidationError) return res.status(err.statusCode).json(failResponse(err.message, err.statusCode))
			throw err
		}
	}
}
