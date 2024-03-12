import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { Roles } from '../../../../../core/enum/Roles'
import UserEntity from '../../../../entities/UserEntity'
import { InMemoryUserRepository } from '../InMemoryUserRepository'

describe('InMemoryUserRepository', () => {
	test('Should return a user', async () => {
		const user = new UserEntity({
			username: faker.person.fullName(),
			password: faker.internet.password(),
			role: Roles.USER,
		})
		const repo = new InMemoryUserRepository()
		const userSaved = await repo.save(user)

		const result = await repo.findById(userSaved.id)

		expect(result).toBeInstanceOf(UserEntity)
	})
	test('Should return null on not found user', async () => {
		const repo = new InMemoryUserRepository()

		const result = await repo.findById(randomUUID())

		expect(result).toBeNull()
	})

	test('Should save and return user', async () => {
		const user = new UserEntity({
			username: faker.person.fullName(),
			password: faker.internet.password(),
			role: Roles.USER,
		})
		const repo = new InMemoryUserRepository()
		const result = await repo.save(user)

		expect(result).toBeInstanceOf(UserEntity)
	})

	test('Should find by username', async () => {
		const user = new UserEntity({
			username: faker.person.fullName(),
			password: faker.internet.password(),
			role: Roles.USER,
		})
		const repo = new InMemoryUserRepository()
		await repo.save(user)

		const result = await repo.findByUsername(user.username)

		expect(result).toBeInstanceOf(UserEntity)
	})
	test('Should return null on not found by username', async () => {
		const repo = new InMemoryUserRepository()

		const result = await repo.findByUsername(faker.person.firstName())

		expect(result).toBeNull()
	})

	test('Should return updated user', async () => {
		const user = new UserEntity({
			username: faker.person.fullName(),
			password: faker.internet.password(),
			role: Roles.USER,
		})
		const repo = new InMemoryUserRepository()

		const { id } = await repo.save(user)

		const newUser = new UserEntity({
			username: faker.person.fullName(),
			password: faker.internet.password(),
			role: Roles.ADMIN,
		})

		const result = await repo.update(newUser, id)

		expect(result).toMatchObject(newUser)
	})

	test('Should return null on not found user when updating', async () => {
		const user = new UserEntity({
			username: faker.person.fullName(),
			password: faker.internet.password(),
			role: Roles.USER,
		})
		const repo = new InMemoryUserRepository()

		const result = await repo.update(user, randomUUID())

		expect(result).toBeNull()
	})

	test('Should delete a user sucessfully', async () => {
		const user = new UserEntity({
			username: faker.person.fullName(),
			password: faker.internet.password(),
			role: Roles.USER,
		})
		const repo = new InMemoryUserRepository()

		const { id } = await repo.save(user)

		const result = await repo.delete(id)

		expect(result).toBeTruthy()
	})

	test('Should return false for user not found when deleting', async () => {
		const user = new UserEntity({
			username: faker.person.fullName(),
			password: faker.internet.password(),
			role: Roles.USER,
		})
		const repo = new InMemoryUserRepository()

		await repo.save(user)

		const result = await repo.delete(randomUUID())

		expect(result).toBeFalsy()
	})
})
