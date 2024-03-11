import ValidationError from '../../../core/errors/Types/ValidationError'
import CoverageEntity from '../CoverageEntity'

describe('CoverageEntity', () => {
	describe('create coverage entity', () => {
		test('Should create a coverage entity sucessfully', async () => {
			const coverageProps = {
				name: 'Coverage name fake',
				description: 'Coverage test description fake',
				capital: 10000,
				premium: 2000,
			}
			const coverage = new CoverageEntity(coverageProps)

			expect(coverage).toBeInstanceOf(CoverageEntity)
		})
		test('Should not create a coverage entity, capital error', async () => {
			const coverageProps = {
				name: 'Coverage name fake',
				description: 'Coverage test description fake',
				capital: 800,
				premium: 3,
			}

			expect(() => {
				new CoverageEntity(coverageProps)
			}).toThrow(ValidationError)
		})
		test('Should not create a coverage entity, premium error', async () => {
			const coverageProps = {
				name: 'Coverage name fake',
				description: 'Coverage test description fake',
				capital: 10000,
				premium: 4000,
			}

			expect(() => {
				new CoverageEntity(coverageProps)
			}).toThrow(ValidationError)
		})
		test('Should not create a coverage entity, premium error, less than 0', async () => {
			const coverageProps = {
				name: 'Coverage name fake',
				description: 'Coverage test description fake',
				capital: 10000,
				premium: -1,
			}

			expect(() => {
				new CoverageEntity(coverageProps)
			}).toThrow(ValidationError)
		})
	})
})
