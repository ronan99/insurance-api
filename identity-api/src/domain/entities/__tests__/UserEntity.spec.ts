import { Roles } from '@prisma/client'
import UserEntity from '../UserEntity'

describe('UserEntity', () => {
	describe('create user entity', () => {
		test('Should create a user entity sucessfully', async () => {
			const userProps = {
				username: 'Testing',
				password: 'Testing@1234',
				role: 'USER' as Roles,
			}
			const user = new UserEntity(userProps)

			expect(user.username).toBe(userProps.username)
		})
	})
})
