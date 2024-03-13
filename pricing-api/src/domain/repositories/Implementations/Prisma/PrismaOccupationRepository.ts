import { Prisma } from '@prisma/client'
import { injectable } from 'inversify'
import OccupationEntity from '../../../entities/OccupationEntity'
import { IOccupationRepository } from '../../IOccupationRepository'
import { PrismaBaseRepository } from './PrismaBaseRepository'

@injectable()
export default class PrismaOccupationRepository extends PrismaBaseRepository implements IOccupationRepository {
	async findById(id: string): Promise<OccupationEntity | null> {
		const occupation = await this.prisma.occupation.findFirst({
			where: {
				id: id,
			},
		})

		if (!occupation) return null

		return new OccupationEntity(occupation)
	}

	async save(occupation: OccupationEntity): Promise<OccupationEntity> {
		const result = await this.prisma.occupation.create({
			data: occupation as Prisma.OccupationCreateInput,
		})
		return new OccupationEntity(result)
	}

	async update(occupation: OccupationEntity, id: string | number): Promise<OccupationEntity | null> {
		const occupationToUpdate = await this.prisma.occupation.findUnique({ where: { id: id.toString() } })

		if (!occupationToUpdate) return null

		const occupationSaved = await this.prisma.occupation.update({
			where: {
				id: id.toString(),
			},
			data: occupation as Prisma.OccupationUpdateInput,
		})

		return new OccupationEntity(occupationSaved)
	}
	async findByName(name: string): Promise<OccupationEntity | null> {
		const occupation = await this.prisma.occupation.findFirst({
			where: {
				name: name,
			},
		})

		if (!occupation) return null

		return new OccupationEntity(occupation)
	}

	async delete(id: string | number): Promise<boolean> {
		const occupationToUpdate = await this.prisma.occupation.findUnique({ where: { id: id.toString() } })

		if (!occupationToUpdate) return false

		const occupationSaved = await this.prisma.occupation.update({
			where: {
				id: id.toString(),
			},
			data: {
				active: false,
			},
		})
		if (!occupationSaved) return false

		return true
	}

	async findByCode(code: string): Promise<OccupationEntity | null> {
		const occupation = await this.prisma.occupation.findFirst({
			where: {
				code: code,
			},
		})

		if (!occupation) return null

		return new OccupationEntity(occupation)
	}
}
