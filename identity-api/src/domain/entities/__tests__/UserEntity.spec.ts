import { Roles } from '@prisma/client'
import ValidationError from '../../../core/errors/Types/ValidationError'
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
		test('Should not create a user entity, password error', async () => {
			const userProps = {
				username: 'Testing',
				password: '1234',
				role: 'USER' as Roles,
			}

			expect(() => {
				new UserEntity(userProps)
			}).toThrow(ValidationError)
		})
		test('Should not create a user entity, password error', async () => {
			const userProps = {
				username: 'Testing',
				password: '1234',
				role: 'aaaaa' as Roles,
			}

			expect(() => {
				new UserEntity(userProps)
			}).toThrow(ValidationError)
		})
	})
})
