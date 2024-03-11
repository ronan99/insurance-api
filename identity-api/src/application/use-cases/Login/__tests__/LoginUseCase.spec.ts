import { Roles } from '../../../../core/enum/Roles'
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
})
