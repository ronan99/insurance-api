import { Roles } from '../../../core/enum/Roles'

export interface IChangeUserRoleRequestDTO {
	id: string | number
	role: Roles
}

export interface IChangeUserRoleResponseDTO {
	userId: string | number
	username: string
	role: string
}
