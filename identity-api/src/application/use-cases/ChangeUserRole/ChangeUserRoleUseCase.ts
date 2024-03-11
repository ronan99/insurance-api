import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { Types } from '../../../di/types'
import { IUserRepository } from '../../../domain/repositories/IUserRepository'
import { IChangeUserRoleRequestDTO, IChangeUserRoleResponseDTO } from './ChangeUserRoleDTO'

@injectable()
export class ChangeUserRoleUseCase {
	constructor(
		@inject(Types.IUserRepository)
		private readonly usersRepository: IUserRepository,
	) {}

	async execute(data: IChangeUserRoleRequestDTO): Promise<IChangeUserRoleResponseDTO> {
		const user = await this.usersRepository.findById(data.id)

		if (!user) {
			throw new ValidationError('Usuário não encontrado', StatusCodes.NOT_FOUND)
		}

		user.role = data.role
		const result = await this.usersRepository.update(user, user.id)

		if (!result) {
			throw new Error('Um erro ocorreu ao tentar atualizar a função do usuário')
		}

		return {
			userId: result.id,
			username: result.username,
			role: result.role,
		}
	}
}
