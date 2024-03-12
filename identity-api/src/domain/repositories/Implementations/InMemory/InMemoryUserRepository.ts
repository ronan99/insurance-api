import 'reflect-metadata'

import bcrypt from 'bcrypt'
import { injectable } from 'inversify'
import UserEntity from '../../../entities/UserEntity'
import { IUserRepository } from '../../IUserRepository'

@injectable()
export class InMemoryUserRepository implements IUserRepository {
	private users: UserEntity[] = []

	async findById(id: string | number): Promise<UserEntity | null> {
		const user = this.users.find((user) => user.id === id && user.deleted !== true)

		if (!user) return Promise.resolve(null)

		return Promise.resolve(user)
	}

	async save(user: UserEntity): Promise<UserEntity> {
		user.password = await bcrypt.hash(user.password, 10)
		this.users.push(user)
		return Promise.resolve(user)
	}

	async findByUsername(username: string): Promise<UserEntity | null> {
		const user = this.users.find((user) => user.username === username && user.deleted !== true)
		if (!user) return Promise.resolve(null)
		return Promise.resolve(user)
	}

	async update(user: UserEntity, id: string | number): Promise<UserEntity | null> {
		const userToUpdate = this.users.find((value) => value.id === id)

		if (userToUpdate) {
			Object.assign(userToUpdate, user)
			return Promise.resolve(userToUpdate)
		}

		return Promise.resolve(null)
	}

	async delete(id: string | number): Promise<boolean> {
		const userToDelete = this.users.find((value) => value.id === id)

		if (userToDelete) {
			userToDelete.deleted = true
			return Promise.resolve(true)
		}

		return Promise.resolve(false)
	}
}
