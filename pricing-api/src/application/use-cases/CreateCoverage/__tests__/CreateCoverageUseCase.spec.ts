import { InMemoryCoverageRepository } from '../../../../domain/repositories/Implementations/InMemory/InMemoryCoverageRepository'
import { CreateCoverageUseCase } from '../CreateCoverageUseCase'

describe('Create Coverage Use Case', () => {
	test('Should save a coverage sucessfully', async () => {
		const coverage = {
			name: 'Coverage name fake',
			description: 'Coverage test description fake',
			capital: 10000,
			premium: 2000,
		}
		const inMemoryCoverageRepository = new InMemoryCoverageRepository()
		const createCoverageUseCase = new CreateCoverageUseCase(inMemoryCoverageRepository)

		const response = await createCoverageUseCase.execute(coverage)

		expect(response).toMatchObject({ name: coverage.name, capital: coverage.capital })
	})
})
