import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { failResponse, successResponse } from '../../../core/shared/Response'
import { Types } from '../../../di/types'
import RoleValidator from '../../validators/Common/RoleValidator'
import Sanitizer from '../../validators/Common/Sanitizer'
import { ChangeUserRoleUseCase } from './ChangeUserRoleUseCase'

@injectable()
export class ChangeUserRoleController {
	constructor(
		@inject(Types.ChangeUserRoleUseCase)
		private changeUserRoleUseCase: ChangeUserRoleUseCase,
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
		const { role } = req.body
		const id = Sanitizer.sanitizeString(req.params.id)
		try {
			if (!id) throw new ValidationError('Id é obrigatório', StatusCodes.BAD_REQUEST)
			if (!role) throw new ValidationError('Função é obrigatória', StatusCodes.BAD_REQUEST)
			const roleValidator = new RoleValidator()
			roleValidator.validate(role)

			const result = await this.changeUserRoleUseCase.execute({ id: id, role })

			return res.status(StatusCodes.OK).json(successResponse(result))
		} catch (err) {
			if (err instanceof ValidationError) return res.status(err.statusCode).json(failResponse(err.message, err.statusCode))
			/* c8 ignore next */
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(failResponse('Um erro interno ocorreu'))
		}
	}
}
