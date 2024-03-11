export const Types = {
	IUserRepository: Symbol.for('IUserRepository'),
	ICoverageRepository: Symbol.for('ICoverageRepository'),

	ChangeUserRoleController: Symbol.for('ChangeUserRoleController'),
	CreateUserController: Symbol.for('CreateUserController'),
	LoginController: Symbol.for('LoginController'),
	CreateCoverageController: Symbol.for('CreateCoverageController'),
	UpdateCoverageController: Symbol.for('UpdateCoverageController'),
	DeleteCoverageController: Symbol.for('DeleteCoverageController'),

	ChangeUserRoleUseCase: Symbol.for('ChangeUserRoleUseCase'),
	CreateUserUseCase: Symbol.for('CreateUserUseCase'),
	LoginUseCase: Symbol.for('LoginUseCase'),
	CreateCoverageUseCase: Symbol.for('CreateCoverageUseCase'),
	UpdateCoverageUseCase: Symbol.for('UpdateCoverageUseCase'),
	DeleteCoverageUseCase: Symbol.for('DeleteCoverageUseCase'),

	PrismaClient: Symbol.for('PrismaClient'),
}
