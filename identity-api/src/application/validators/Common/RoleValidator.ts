import { Roles } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import ValidationError from '../../../core/errors/Types/ValidationError'

export default class RoleValidator {
	validate(role: string): boolean {
		if (!Object.values(Roles).includes(role as Roles)) {
			throw new ValidationError('Essa função não existe.', StatusCodes.UNPROCESSABLE_ENTITY)
		}
		return true
	}
}
