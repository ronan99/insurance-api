import { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
import UserEntity from '../../../entities/UserEntity'
import { IUserRepository } from '../../IUserRepository'
import { PrismaBaseRepository } from './PrismaBaseRepository'

export class PrismaUserRepository extends PrismaBaseRepository implements IUserRepository {
	async delete(id: string | number): Promise<boolean> {
		const userToUpdate = await this.prisma.user.findUnique({ where: { id: id.toString() } })

		if (!userToUpdate) return false

		const userUpdated = await this.prisma.user.update({
			where: {
				id: id.toString(),
			},
			data: {
				deleted: true,
			},
		})
		if (!userUpdated) return false

		return true
	}

	async findById(id: string): Promise<UserEntity | null> {
		const userDb = await this.prisma.user.findUnique({
			where: { id, deleted: false },
		})

		if (!userDb) return null

		const user = new UserEntity(userDb)

		return user
	}

	async save(user: UserEntity): Promise<UserEntity> {
		user.password = await bcrypt.hash(user.password, 10)
		const data = await this.prisma.user.create({
			data: user as Prisma.UserCreateInput,
		})

		return new UserEntity(data)
	}

	async findByUsername(username: string): Promise<UserEntity | null> {
		const user = await this.prisma.user.findFirst({
			where: {
				username: username,
				deleted: false,
			},
		})
		if (!user) return null
		return new UserEntity(user)
	}

	async update(user: UserEntity, id: string | number): Promise<UserEntity | null> {
		const userToUpdate = await this.prisma.user.findUnique({ where: { id: id.toString() } })

		if (!userToUpdate) return null

		const userSaved = await this.prisma.user.update({
			where: {
				id: id.toString(),
			},
			data: user as Prisma.UserUpdateInput,
		})

		return new UserEntity(userSaved)
	}
}
