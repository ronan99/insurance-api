import { randomUUID } from 'crypto'
import { Roles } from '../../core/enum/Roles'

export interface UserProps {
	id?: number | string
	username: string
	password: string
	role: Roles
	deleted?: boolean
}

export default class UserEntity {
	id: number | string
	username: string
	password: string
	role: Roles
	deleted: boolean

	constructor(props: UserProps) {
		this.id = props.id || randomUUID()
		this.username = props.username
		this.password = props.password
		this.role = props.role
		this.deleted = props.deleted ?? false
	}
}
