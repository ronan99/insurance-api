import { randomUUID } from 'crypto'

export interface AgeFactorProps {
	id?: number | string
	age: number
	factor: number
	deleted?: boolean
}

export default class AgeFactorEntity {
	id: number | string
	age: number
	factor: number
	deleted: boolean

	constructor(props: AgeFactorProps) {
		this.id = props.id || randomUUID()
		this.age = props.age
		this.factor = props.factor
		this.deleted = props.deleted ?? false
	}
}
