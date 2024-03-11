import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { Types } from '../../../di/types'
import UserEntity from '../../../domain/entities/UserEntity'
import { IUserRepository } from '../../../domain/repositories/IUserRepository'
import { ICreateUserRequestDTO, ICreateUserResponseDTO } from './CreateUserDTO'

@injectable()
export class CreateUserUseCase {
	constructor(
		@inject(Types.IUserRepository)
		private readonly usersRepository: IUserRepository,
	) {}

	async execute(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
		const userAlreadyExists = await this.usersRepository.findByUsername(data.username)

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
