import { Roles } from '../../../../core/enum/Roles'
import ValidationError from '../../../../core/errors/Types/ValidationError'
import { InMemoryUserRepository } from '../../../../domain/repositories/Implementations/InMemory/InMemoryUserRepository'
import { CreateUserUseCase } from '../../CreateUser/CreateUserUseCase'
import { LoginUseCase } from '../LoginUseCase'

describe('Login Use Case', () => {
	test('Should login an user sucessfully', async () => {
		const userToCreate = {
			username: 'Testing',
			password: 'Testing@1234',
			role: Roles.ADMIN,
		}
		const inMemoryUserRepository = new InMemoryUserRepository()
		const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)

		const user = await createUserUseCase.execute({ ...userToCreate })

		const loginUseCase = new LoginUseCase(inMemoryUserRepository)

		const response = await loginUseCase.execute({ username: user.username, password: userToCreate.password })

		expect(response).toHaveProperty('access_token')
	})
	test('Should throw error of user not found', async () => {
		const inMemoryUserRepository = new InMemoryUserRepository()
		const loginUseCase = new LoginUseCase(inMemoryUserRepository)

		expect(async () => {
			await loginUseCase.execute({ username: 'randomname', password: 'randompass' })
		}).rejects.toThrow(ValidationError)
	})

	test('Should throw an error for wrong password', async () => {
		const userToCreate = {
			username: 'Testing',
			password: 'Testing@1234',
			role: Roles.ADMIN,
		}
		const inMemoryUserRepository = new InMemoryUserRepository()
		const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)

		const user = await createUserUseCase.execute({ ...userToCreate })

		const loginUseCase = new LoginUseCase(inMemoryUserRepository)

		expect(async () => {
			await loginUseCase.execute({ username: user.username, password: 'randompass' })
		}).rejects.toThrow(ValidationError)
	})
})
