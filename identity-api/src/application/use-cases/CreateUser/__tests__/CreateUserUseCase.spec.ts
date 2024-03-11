import { Roles } from '../../../../core/enum/Roles'
import { InMemoryUserRepository } from '../../../../domain/repositories/Implementations/InMemory/InMemoryUserRepository'
import { CreateUserUseCase } from '../CreateUserUseCase'

describe('Create User Use Case', () => {
	test('Should save a user sucessfully', async () => {
		const user = {
			username: 'Testing',
			password: 'Testing@1234',
			role: Roles.ADMIN,
		}
		const inMemoryUserRepository = new InMemoryUserRepository()
		const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)

		const response = await createUserUseCase.execute(user)

		expect(response).toMatchObject({ username: user.username, role: user.role })
	})
})
