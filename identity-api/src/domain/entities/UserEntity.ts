import { randomUUID } from 'crypto'
import { StatusCodes } from 'http-status-codes'
import { Roles } from '../../core/enum/Roles'
import ValidationError from '../../core/errors/Types/ValidationError'

export interface UserProps {
	id?: number | string
	username: string
	password: string
	role: Roles
	deleted?: boolean
}
//TODO: transformar as regras separadas e retornar qual delas não passou para senha
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!$%])[a-zA-Z\d@#!$%]{8,64}$/

export default class UserEntity {
	id: number | string
	username: string
	password: string
	role: Roles
	deleted: boolean

	validatePassword(): void {
		if (!passwordRegex.test(this.password)) {
			throw new ValidationError('A senha deve atender aos critérios especificados.', StatusCodes.UNPROCESSABLE_ENTITY)
		}
	}
	validateRole(): void {
		if (!Object.values(Roles).includes(this.role as Roles)) {
			throw new ValidationError('Essa função não existe.', StatusCodes.UNPROCESSABLE_ENTITY)
		}
	}

	constructor(props: UserProps) {
		this.id = props.id || randomUUID()
		this.username = props.username
		this.password = props.password
		this.role = props.role
		this.deleted = props.deleted ?? false
		this.validateRole()
		this.validatePassword()
	}
}
