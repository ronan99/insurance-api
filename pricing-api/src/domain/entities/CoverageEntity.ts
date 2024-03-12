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
	private _premium: number
	private _capital: number
	deleted: boolean

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
	get premium(): number {
		return this._premium
	}
	get capital(): number {
		return this._capital
	}
	set premium(premium: number) {
		if (!this._capital) {
			throw new ValidationError('Capital deve ser validado primeiro', 500)
		}
		this.validatePremium(premium, this._capital)
		this._premium = premium
	}
	set capital(capital: number) {
		this.validateCapital(capital)
		this._capital = capital
	}

	toDTO(): CoverageProps {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			capital: this.capital,
			premium: this.premium,
			deleted: this.deleted,
		}
	}

	constructor(props: CoverageProps) {
		this.id = props.id || randomUUID()
		this.name = props.name
		this.description = props.description
		this._capital = props.capital
		this._premium = props.premium
		this.deleted = props.deleted ?? false
	}
}
