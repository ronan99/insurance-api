import ValidationError from '../../../../core/errors/Types/ValidationError'
import { InMemoryCoverageRepository } from '../../../../domain/repositories/Implementations/InMemory/InMemoryCoverageRepository'
import { CreateCoverageUseCase } from '../../CreateCoverage/CreateCoverageUseCase'
import { DeleteCoverageUseCase } from '../../DeleteCoverage/DeleteCoverageUseCase'
import { UpdateCoverageUseCase } from '../UpdateCoverageUseCase'

// jest.useFakeTimers()
describe('Update coverage use case', () => {
	let coverageSaved = {
		name: 'fakename',
		description: 'Coverage test description fake',
		capital: 10000,
		premium: 2000,
	}
	beforeEach(async () => {
		coverageSaved = {
			name: 'fakename',
			description: 'Coverage test description fake',
			capital: 10000,
			premium: 2000,
		}
	})

	test('Should update a coverage sucessfully', async () => {
		const inMemoryCoverageRepository = new InMemoryCoverageRepository()
		const createCoverageUseCase = new CreateCoverageUseCase(inMemoryCoverageRepository)
		await createCoverageUseCase.execute(coverageSaved)

		const updateCoverageUseCase = new UpdateCoverageUseCase(inMemoryCoverageRepository)

		coverageSaved.description = 'updated description'
		coverageSaved.capital = 20000
		const response = await updateCoverageUseCase.execute(coverageSaved)
		console.table([response, coverageSaved])
		expect(response).toMatchObject(coverageSaved)
	})

	test('Should give an capital error when updating a coverage', async () => {
		const inMemoryCoverageRepository = new InMemoryCoverageRepository()

		const createCoverageUseCase = new CreateCoverageUseCase(inMemoryCoverageRepository)
		await createCoverageUseCase.execute(coverageSaved)

		const updateCoverageUseCase = new UpdateCoverageUseCase(inMemoryCoverageRepository)
		coverageSaved.capital = 500
		expect(async () => {
			await updateCoverageUseCase.execute(coverageSaved)
		}).rejects.toThrow(ValidationError)
	})

	test('Should give an premium error when updating a coverage', async () => {
		const inMemoryCoverageRepository = new InMemoryCoverageRepository()

		const createCoverageUseCase = new CreateCoverageUseCase(inMemoryCoverageRepository)
		await createCoverageUseCase.execute(coverageSaved)

		const updateCoverageUseCase = new UpdateCoverageUseCase(inMemoryCoverageRepository)
		coverageSaved.premium = 5000
		expect(async () => {
			await updateCoverageUseCase.execute(coverageSaved)
		}).rejects.toThrow(ValidationError)
	})

	test('Should give an error when updating a non existing coverage', async () => {
		const inMemoryCoverageRepository = new InMemoryCoverageRepository()

		const createCoverageUseCase = new CreateCoverageUseCase(inMemoryCoverageRepository)
		await createCoverageUseCase.execute(coverageSaved)

		const updateCoverageUseCase = new UpdateCoverageUseCase(inMemoryCoverageRepository)
		coverageSaved.name = 'randomname'
		expect(async () => {
			await updateCoverageUseCase.execute(coverageSaved)
		}).rejects.toThrow(ValidationError)
	})

	test('Should activate an coverage when editing after removed', async () => {
		const inMemoryCoverageRepository = new InMemoryCoverageRepository()

		const createCoverageUseCase = new CreateCoverageUseCase(inMemoryCoverageRepository)
		const coverageToDelete = await createCoverageUseCase.execute(coverageSaved)

		const deleteCoverageUseCase = new DeleteCoverageUseCase(inMemoryCoverageRepository)
		await deleteCoverageUseCase.execute(coverageToDelete.coverageId)

		const updateCoverageUseCase = new UpdateCoverageUseCase(inMemoryCoverageRepository)
		const newCoverage = {
			name: 'fakename',
			description: 'Coverage test description fake',
			capital: 10000,
			premium: 2000,
		}

		const response = await updateCoverageUseCase.execute(newCoverage)
		expect(response).toMatchObject(newCoverage)
	})
})
