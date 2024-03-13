import ValidationError from '../../../../core/errors/Types/ValidationError'
import { InMemoryCoverageRepository } from '../../../../domain/repositories/Implementations/InMemory/InMemoryCoverageRepository'
import { CreateCoverageUseCase } from '../../CreateCoverage/CreateCoverageUseCase'
import { DeleteCoverageUseCase } from '../DeleteCoverageUseCase'

describe('Delete coverage use case', () => {
	let coverageToSave = {
		name: 'fakename',
		description: 'Coverage test description fake',
		capital: 10000,
		premium: 2000,
	}
	beforeEach(async () => {
		coverageToSave = {
			name: 'fakename',
			description: 'Coverage test description fake',
			capital: 10000,
			premium: 2000,
		}
	})

	test('Should delete a coverage sucessfully', async () => {
		const inMemoryCoverageRepository = new InMemoryCoverageRepository()
		const createCoverageUseCase = new CreateCoverageUseCase(inMemoryCoverageRepository)
		const coverage = await createCoverageUseCase.execute(coverageToSave)

		const deleteCoverageUseCase = new DeleteCoverageUseCase(inMemoryCoverageRepository)

		const response = await deleteCoverageUseCase.execute(coverage.coverageId)

		expect(response).toBeTruthy()
	})
	test('Should give not found for coverage not ofund', async () => {
		const inMemoryCoverageRepository = new InMemoryCoverageRepository()
		const deleteCoverageUseCase = new DeleteCoverageUseCase(inMemoryCoverageRepository)

		expect(async () => {
			await deleteCoverageUseCase.execute('randomid')
		}).rejects.toThrow(ValidationError)
	})
})
