export const Types = {
	ICoverageRepository: Symbol.for('ICoverageRepository'),
	IOccupationRepository: Symbol.for('IOccupationRepository'),

	CreateCoverageController: Symbol.for('CreateCoverageController'),
	UpdateCoverageController: Symbol.for('UpdateCoverageController'),
	DeleteCoverageController: Symbol.for('DeleteCoverageController'),
	CalculateQuoteController: Symbol.for('CalculateQuoteController'),

	CreateCoverageUseCase: Symbol.for('CreateCoverageUseCase'),
	UpdateCoverageUseCase: Symbol.for('UpdateCoverageUseCase'),
	DeleteCoverageUseCase: Symbol.for('DeleteCoverageUseCase'),
	CalculateQuoteUseCase: Symbol.for('CalculateQuoteUseCase'),

	PrismaClient: Symbol.for('PrismaClient'),
}
