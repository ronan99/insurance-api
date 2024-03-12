import { StatusCodes } from 'http-status-codes'
import ValidationError from '../../../core/errors/Types/ValidationError'

export default class CoverageValidator {
	validateCapital(capital: number) {
		if (capital % 10 !== 0 || capital < 1000) {
			throw new ValidationError('Capital deve ser múltiplo de 10 e maior ou igual a 1000', StatusCodes.UNPROCESSABLE_ENTITY)
		}
		if (capital > 10000000) {
			throw new ValidationError('Capital deve ser menor ou igual a 10000000', StatusCodes.UNPROCESSABLE_ENTITY)
		}
	}

	validatePremium(premium: number, capital: number) {
		if (premium < 0 || premium > 0.3 * capital) {
			throw new ValidationError('Prêmio deve ser maior que 0 e menor que 30% do capital', StatusCodes.UNPROCESSABLE_ENTITY)
		}
	}
}
