import { randomUUID } from 'crypto'

export interface OccupationProps {
	id?: number | string
	code: string | number
	name: string
	active: boolean
	factor: number
}

export default class OccupationEntity {
	id: number | string
	code: string | number
	name: string
	active: boolean
	factor: number

	constructor(props: OccupationProps) {
		this.id = props.id || randomUUID()
		this.code = props.code
		this.name = props.name
		this.active = props.active
		this.factor = props.factor
	}
}
