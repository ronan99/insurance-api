import { Prisma } from '@prisma/client'
import { injectable } from 'inversify'
import CoverageEntity from '../../../entities/CoverageEntity'
import { ICoverageRepository } from '../../ICoverageRepository'
import { PrismaBaseRepository } from './PrismaBaseRepository'

@injectable()
export default class PrismaCoverageRepository extends PrismaBaseRepository implements ICoverageRepository {
	async findById(id: string): Promise<CoverageEntity | null> {
		const coverage = await this.prisma.coverage.findFirst({
			where: {
				id: id,
				deleted: false,
			},
		})

		if (!coverage) return null

		return new CoverageEntity(coverage)
	}

	async save(coverage: CoverageEntity): Promise<CoverageEntity> {
		const result = await this.prisma.coverage.create({
			data: coverage.toDTO() as Prisma.CoverageCreateInput,
		})
		return new CoverageEntity(result)
	}

	async update(coverage: CoverageEntity, id: string | number): Promise<CoverageEntity | null> {
		const coverageToUpdate = await this.prisma.coverage.findUnique({ where: { id: id.toString() } })

		if (!coverageToUpdate) return null

		const coverageSaved = await this.prisma.coverage.update({
			where: {
				id: id.toString(),
			},
			data: coverage.toDTO() as Prisma.CoverageUpdateInput,
		})

		return new CoverageEntity(coverageSaved)
	}
	async findByName(name: string): Promise<CoverageEntity | null> {
		const coverage = await this.prisma.coverage.findFirst({
			where: {
				name: name,
				deleted: false,
			},
		})

		if (!coverage) return null

		return new CoverageEntity(coverage)
	}

	async findByIdWithDeleted(id: string): Promise<CoverageEntity | null> {
		const coverage = await this.prisma.coverage.findFirst({
			where: {
				id: id,
			},
		})

		if (!coverage) return null

		return new CoverageEntity(coverage)
	}
	async findByNameWithDeleted(name: string): Promise<CoverageEntity | null> {
		const coverage = await this.prisma.coverage.findFirst({
			where: {
				name: name,
			},
		})

		if (!coverage) return null

		return new CoverageEntity(coverage)
	}

	async delete(id: string | number): Promise<boolean> {
		const coverageToUpdate = await this.prisma.coverage.findUnique({ where: { id: id.toString() } })

		if (!coverageToUpdate) return false

		const coverageSaved = await this.prisma.coverage.update({
			where: {
				id: id.toString(),
			},
			data: {
				deleted: true,
			},
		})
		if (!coverageSaved) return false

		return true
	}

	async findByIdList(ids: string[]): Promise<CoverageEntity[] | null> {
		const coverages = await this.prisma.coverage.findMany({
			where: {
				id: {
					in: ids,
				},
				deleted: false,
			},
		})

		if (!coverages) return null

		let result: CoverageEntity[] = []

		for (let coverage of coverages) {
			result.push(new CoverageEntity(coverage))
		}
		return result
	}
}
