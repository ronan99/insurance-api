import { Roles } from '../../../core/enum/Roles'

export interface ICreateUserRequestDTO {
	username: string
	password: string
	role: Roles
}

export interface ICreateUserResponseDTO {
	userId: string | number
	username: string
	role: string
}
