import 'reflect-metadata'

import { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
import { injectable } from 'inversify'
import UserEntity from '../../../entities/UserEntity'
import { IUserRepository } from '../../IUserRepository'
import { PrismaService } from './PrismaService'

@injectable()
export class PrismaUserRepository implements IUserRepository {
	// constructor(private prisma: PrismaClient) {}
	delete(id: string | number): Promise<boolean> {
		throw new Error('Method not implemented.' + id)
	}

	async findById(id: string): Promise<UserEntity | null> {
		const userDb = await PrismaService.user.findUnique({
			where: { id, deleted: false },
		})

		if (!userDb) return null

		const user = new UserEntity(userDb)

		return user
	}

	async save(user: UserEntity): Promise<UserEntity> {
		user.password = await bcrypt.hash(user.password, 10)
		const data = await PrismaService.user.create({
			data: user as Prisma.UserCreateInput,
		})

		return new UserEntity(data)
	}

	async findByUsername(username: string): Promise<UserEntity | null> {
		const user = await PrismaService.user.findFirst({
			where: {
				username: username,
				deleted: false,
			},
		})
		if (!user) return null
		return new UserEntity(user)
	}

	async update(user: UserEntity, id: string | number): Promise<UserEntity | null> {
		const userToUpdate = await PrismaService.user.findUnique({ where: { id: id.toString() } })

		if (!userToUpdate) return null

		const userSaved = await PrismaService.user.update({
			where: {
				id: id.toString(),
			},
			data: user as Prisma.UserUpdateInput,
		})

		return new UserEntity(userSaved)
	}
}
