import 'reflect-metadata'

import { injectable } from 'inversify'
import OccupationEntity from '../../../entities/OccupationEntity'
import { IOccupationRepository } from '../../IOccupationRepository'

@injectable()
export class InMemoryOccupationRepository implements IOccupationRepository {
	private occupations: OccupationEntity[] = []

	async findById(id: string | number): Promise<OccupationEntity | null> {
		const occupation = this.occupations.find((occupation) => occupation.id === id && occupation.active !== true)

		if (!occupation) return Promise.resolve(null)

		return Promise.resolve(occupation)
	}

	async save(occupation: OccupationEntity): Promise<OccupationEntity> {
		this.occupations.push(occupation)
		return Promise.resolve(occupation)
	}

	async update(occupation: OccupationEntity, id: string | number): Promise<OccupationEntity | null> {
		const occupationToUpdate = this.occupations.find((value) => value.id === id)

		if (occupationToUpdate) {
			Object.assign(occupationToUpdate, occupation)
			return Promise.resolve(occupationToUpdate)
		}

		return Promise.resolve(null)
	}
	async findByName(name: string): Promise<OccupationEntity | null> {
		const occupation = this.occupations.find((occupation) => occupation.name === name && occupation.active !== true)
		if (!occupation) return Promise.resolve(null)
		return Promise.resolve(occupation)
	}

	async findByNameDeleted(name: string): Promise<OccupationEntity | null> {
		const occupation = this.occupations.find((occupation) => occupation.name === name)

		if (!occupation) return Promise.resolve(null)

		return Promise.resolve(occupation)
	}

	async delete(id: string | number): Promise<boolean> {
		const occupationToDelete = this.occupations.find((value) => value.id === id)

		if (occupationToDelete) {
			occupationToDelete.active = true
			return Promise.resolve(true)
		}

		return Promise.resolve(false)
	}

	async findByCode(code: string): Promise<OccupationEntity | null> {
		const occupation = this.occupations.find((occupation) => occupation.code === code && occupation.active === true)

		if (!occupation) return Promise.resolve(null)

		return Promise.resolve(occupation)
	}
}
