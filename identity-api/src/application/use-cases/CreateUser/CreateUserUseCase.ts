import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { Types } from '../../../di/types'
import UserEntity from '../../../domain/entities/UserEntity'
import { IUserRepository } from '../../../domain/repositories/IUserRepository'
import RoleValidator from '../../validators/Common/RoleValidator'
import PasswordValidator from '../../validators/CreateUser/PasswordValidator'
import { ICreateUserRequestDTO, ICreateUserResponseDTO } from './CreateUserDTO'

@injectable()
export class CreateUserUseCase {
	constructor(
		@inject(Types.IUserRepository)
		private readonly usersRepository: IUserRepository,
	) {}

	async execute(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
		if (!data.username) throw new ValidationError('Nome de usuário é obrigatório')
		if (!data.password) throw new ValidationError('Senha do usuário é obrigatória')
		if (!data.role) throw new ValidationError('Função do usuário é obrigatório')

		const userAlreadyExists = await this.usersRepository.findByUsername(data.username)

		const passValidator = new PasswordValidator()
		const roleValidator = new RoleValidator()
		passValidator.validate(data.password)
		roleValidator.validate(data.role)

		if (userAlreadyExists) {
			throw new ValidationError('Usuário já existe com este nome', StatusCodes.CONFLICT)
		}
		const user = new UserEntity(data)

		const result = await this.usersRepository.save(user)
		return {
			userId: result.id,
			username: result.username,
			role: result.role,
		}
	}
}
