import { randomUUID } from 'crypto'
import { StatusCodes } from 'http-status-codes'
import ValidationError from '../../core/errors/Types/ValidationError'

export interface CoverageProps {
	id?: number | string
	name: string
	description: string
	capital: number
	premium: number
	deleted?: boolean
}

export default class CoverageEntity {
	id: number | string
	name: string
	description: string
	capital: number
	premium: number
	deleted: boolean

	validateCapital() {
		if (this.capital % 10 !== 0 || this.capital < 1000) {
			throw new ValidationError('Capital deve ser múltiplo de 10 e maior ou igual a 1000', StatusCodes.UNPROCESSABLE_ENTITY)
		}
	}

	validatePremium() {
		if (this.premium < 0 || this.premium > 0.3 * this.capital) {
			throw new ValidationError('Prêmio deve ser maior que 0 e menor que 30% do capital', StatusCodes.UNPROCESSABLE_ENTITY)
		}
	}

	constructor(props: CoverageProps) {
		this.id = props.id || randomUUID()
		this.name = props.name
		this.description = props.description
		this.capital = props.capital
		this.premium = props.premium
		this.deleted = props.deleted ?? false

		this.validateCapital()
		this.validatePremium()
	}
}
