import ValidationError from '../../../../core/errors/Types/ValidationError'
import PasswordValidator from '../PasswordValidator'

describe('Sanitizer', () => {
	test('Should pass validation', () => {
		const password = 'Password@1234'

		const validator = new PasswordValidator()
		const result = validator.validate(password)

		expect(result).toBeTruthy()
	})
	test('Should throw invalid password for too short, no number and no special chars', () => {
		const password = 'Pass'

		expect(() => {
			const validator = new PasswordValidator()
			validator.validate(password)
		}).toThrow(ValidationError)
	})
	test('Should throw invalid password for too short and no number', () => {
		const password = 'Pass@'

		expect(() => {
			const validator = new PasswordValidator()
			validator.validate(password)
		}).toThrow(ValidationError)
	})
	test('Should throw invalid password for too short', () => {
		const password = 'P455@'

		expect(() => {
			const validator = new PasswordValidator()
			validator.validate(password)
		}).toThrow(ValidationError)
	})
})
