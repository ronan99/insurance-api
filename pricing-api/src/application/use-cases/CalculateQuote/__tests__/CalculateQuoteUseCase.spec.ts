import ValidationError from '../../../../core/errors/Types/ValidationError'
import OccupationEntity from '../../../../domain/entities/OccupationEntity'
import { InMemoryCoverageRepository } from '../../../../domain/repositories/Implementations/InMemory/InMemoryCoverageRepository'
import { InMemoryOccupationRepository } from '../../../../domain/repositories/Implementations/InMemory/InMemoryOccupationRepository'
import { CreateCoverageUseCase } from '../../CreateCoverage/CreateCoverageUseCase'
import { CalculateQuoteUseCase } from '../CalculateQuoteUseCase'

// jest.useFakeTimers()
describe('Update coverage use case', () => {
	let coverageDb = {
		name: 'fakename',
		description: 'Coverage test description fake',
		capital: 10000,
		premium: 2000,
	}

	beforeAll(async () => {
		coverageDb = {
			name: 'fakename',
			description: 'Coverage test description fake',
			capital: 10000,
			premium: 10,
		}
	})

	test('Should update a coverage sucessfully', async () => {
		const inMemoryCoverageRepository = new InMemoryCoverageRepository()
		const createCoverageUseCase = new CreateCoverageUseCase(inMemoryCoverageRepository)
		const coverage = await createCoverageUseCase.execute(coverageDb)
		const coverage2 = await createCoverageUseCase.execute({
			name: 'fakename2',
			description: 'Coverage test description fake',
			capital: 15000,
			premium: 20,
		})

		const inMemoryOccupationRepository = new InMemoryOccupationRepository()
		await inMemoryOccupationRepository.save(
			new OccupationEntity({
				code: 768110,
				name: 'Trapaceiro',
				active: true,
				factor: 1.02,
			}),
		)

		const calculateQuoteUseCase = new CalculateQuoteUseCase(inMemoryCoverageRepository, inMemoryOccupationRepository)

		const result = await calculateQuoteUseCase.execute({
			age: 26,
			occupationCode: 768110,
			capital: 100000,
			coverages: [coverage.coverageId, coverage2.coverageId],
		})
		expect(result).toMatchObject({
			ageFactor: 1.75,
			occupationFactor: 1.02,
			coverages: [
				{
					premium: 178.5,
				},
				{
					premium: 249.9,
				},
			],
			capital: 100000,
			premium: 428.4,
		})
	})

	test('Should give an error of no coverages found', async () => {
		const inMemoryCoverageRepository = new InMemoryCoverageRepository()

		const inMemoryOccupationRepository = new InMemoryOccupationRepository()
		await inMemoryOccupationRepository.save(
			new OccupationEntity({
				code: 768110,
				name: 'Trapaceiro',
				active: true,
				factor: 1.02,
			}),
		)

		const calculateQuoteUseCase = new CalculateQuoteUseCase(inMemoryCoverageRepository, inMemoryOccupationRepository)

		expect(async () => {
			await calculateQuoteUseCase.execute({
				age: 26,
				occupationCode: 768110,
				capital: 100000,
				coverages: ['randomid'],
			})
		}).rejects.toThrow(ValidationError)
	})
	test('Should give an error of no occupations found', async () => {
		const inMemoryCoverageRepository = new InMemoryCoverageRepository()
		const createCoverageUseCase = new CreateCoverageUseCase(inMemoryCoverageRepository)
		const coverage = await createCoverageUseCase.execute(coverageDb)
		const coverage2 = await createCoverageUseCase.execute({
			name: 'fakename2',
			description: 'Coverage test description fake',
			capital: 15000,
			premium: 20,
		})

		const inMemoryOccupationRepository = new InMemoryOccupationRepository()

		const calculateQuoteUseCase = new CalculateQuoteUseCase(inMemoryCoverageRepository, inMemoryOccupationRepository)

		expect(async () => {
			await calculateQuoteUseCase.execute({
				age: 26,
				occupationCode: 768110,
				capital: 100000,
				coverages: [coverage.coverageId, coverage2.coverageId],
			})
		}).rejects.toThrow(ValidationError)
	})
})
