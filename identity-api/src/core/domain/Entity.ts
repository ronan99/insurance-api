import { randomUUID } from 'crypto'

export abstract class Entity<T> {
	protected id: string
	props: T

	constructor(props: T, id?: string) {
		this.props = props
		this.id = id ?? randomUUID()
	}
}
