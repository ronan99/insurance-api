import { Roles } from '../../../../core/enum/Roles'
import ValidationError from '../../../../core/errors/Types/ValidationError'
import RoleValidator from '../RoleValidator'

describe('RoleValidator', () => {
	test('Should correctly validate a role', () => {
		const role = Roles.USER
		const roleValidator = new RoleValidator()
		const result = roleValidator.validate(role)

		expect(result).toBeTruthy()
	})
	test('Should throw invalid role', () => {
		const role = 'randomrole'

		expect(() => {
			const roleValidator = new RoleValidator()
			roleValidator.validate(role)
		}).toThrow(ValidationError)
	})
})
