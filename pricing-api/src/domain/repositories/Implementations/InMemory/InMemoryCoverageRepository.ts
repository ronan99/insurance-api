import 'reflect-metadata'

import { injectable } from 'inversify'
import CoverageEntity from '../../../entities/CoverageEntity'
import { ICoverageRepository } from '../../ICoverageRepository'

@injectable()
export class InMemoryCoverageRepository implements ICoverageRepository {
	private coverages: CoverageEntity[] = []

	async findById(id: string | number): Promise<CoverageEntity | null> {
		const coverage = this.coverages.find((coverage) => coverage.id === id && coverage.deleted !== true)

		if (!coverage) return Promise.resolve(null)

		return Promise.resolve(coverage)
	}

	async save(coverage: CoverageEntity): Promise<CoverageEntity> {
		this.coverages.push(coverage)
		return Promise.resolve(coverage)
	}

	async update(coverage: CoverageEntity, id: string | number): Promise<CoverageEntity | null> {
		const coverageToUpdate = this.coverages.find((value) => value.id === id)

		if (coverageToUpdate) {
			Object.assign(coverageToUpdate, coverage)
			return Promise.resolve(coverageToUpdate)
		}

		return Promise.resolve(null)
	}
	async findByName(name: string): Promise<CoverageEntity | null> {
		const coverage = this.coverages.find((coverage) => coverage.name === name && coverage.deleted !== true)
		if (!coverage) return Promise.resolve(null)
		return Promise.resolve(coverage)
	}

	async findByNameDeleted(name: string): Promise<CoverageEntity | null> {
		const coverage = this.coverages.find((coverage) => coverage.name === name)

		if (!coverage) return Promise.resolve(null)

		return Promise.resolve(coverage)
	}

	async delete(id: string | number): Promise<boolean> {
		const coverageToDelete = this.coverages.find((value) => value.id === id)

		if (coverageToDelete) {
			coverageToDelete.deleted = true
			return Promise.resolve(true)
		}

		return Promise.resolve(false)
	}
}
