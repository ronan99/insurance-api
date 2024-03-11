import { Roles } from '../../../../core/enum/Roles'
import { InMemoryUserRepository } from '../../../../domain/repositories/Implementations/InMemory/InMemoryUserRepository'
import { CreateUserUseCase } from '../../CreateUser/CreateUserUseCase'
import { ChangeUserRoleUseCase } from '../ChangeUserRoleUseCase'

describe('Change user role use Case', () => {
	test('Should change the role of a user sucessfully', async () => {
		const userToSave = {
			username: 'Testing2',
			password: 'Testing@1234',
			role: Roles.ADMIN,
		}
		const inMemoryUserRepository = new InMemoryUserRepository()

		const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
		const user = await createUserUseCase.execute(userToSave)

		const changeUserRoleUseCase = new ChangeUserRoleUseCase(inMemoryUserRepository)

		const response = await changeUserRoleUseCase.execute({ id: user.userId, role: Roles.USER })

		expect(response).toMatchObject({ username: user.username, role: Roles.USER })
	})
})
