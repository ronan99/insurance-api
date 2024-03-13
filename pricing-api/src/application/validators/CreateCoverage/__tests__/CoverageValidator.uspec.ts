import CoverageValidator from '../CoverageValidator'

describe('CoverageValidator', () => {
	test('Should validate capital sucessfully', async () => {
		const validator = new CoverageValidator()
		const capital = 10000

		expect(() => {
			validator.validateCapital(capital)
		}).not.toThrow()
	})
	test('Should validate capital premium sucessfully', async () => {
		const validator = new CoverageValidator()
		const capital = 10000
		const premium = 100

		expect(() => {
			validator.validatePremium(premium, capital)
		}).not.toThrow()
	})
	test('Should throw error for capital not multiple of 10', async () => {
		const validator = new CoverageValidator()
		const capital = 12455

		expect(() => {
			validator.validateCapital(capital)
		}).toThrow()
	})
	test('Should throw error for capital less than 1000', async () => {
		const validator = new CoverageValidator()
		const capital = 500

		expect(() => {
			validator.validateCapital(capital)
		}).toThrow()
	})
	test('Should throw error for capital bigger than 10000000', async () => {
		const validator = new CoverageValidator()
		const capital = 20000000

		expect(() => {
			validator.validateCapital(capital)
		}).toThrow()
	})
	test('Should throw error for premium higher than 30% of capital', async () => {
		const validator = new CoverageValidator()
		const capital = 10000
		const premium = 4000

		expect(() => {
			validator.validatePremium(premium, capital)
		}).toThrow()
	})
	test('Should throw error for premium negative', async () => {
		const validator = new CoverageValidator()
		const capital = 10000
		const premium = -4

		expect(() => {
			validator.validatePremium(premium, capital)
		}).toThrow()
	})
})
