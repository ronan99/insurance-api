import { StatusCodes } from 'http-status-codes'
import ValidationError from '../../../core/errors/Types/ValidationError'

export default class PasswordValidator {
	protected regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!$%])[a-zA-Z\d@#!$%]{8,64}$/

	validate(password: string): boolean {
		if (!this.regex.test(password)) {
			throw new ValidationError('A senha deve atender aos critérios especificados.', StatusCodes.UNPROCESSABLE_ENTITY)
		}
		return true
	}
}
