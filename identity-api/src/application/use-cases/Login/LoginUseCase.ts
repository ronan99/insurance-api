import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'inversify'
import jwt from 'jsonwebtoken'
import config from '../../../config'
import ValidationError from '../../../core/errors/Types/ValidationError'
import { Types } from '../../../di/types'
import { IUserRepository } from '../../../domain/repositories/IUserRepository'
import { ILoginRequestDTO, ILoginResponseDTO } from './LoginDTO'

@injectable()
export class LoginUseCase {
	constructor(
		@inject(Types.IUserRepository)
		private readonly usersRepository: IUserRepository,
	) {}

	async execute(data: ILoginRequestDTO): Promise<ILoginResponseDTO> {
		const user = await this.usersRepository.findByUsername(data.username)

		if (!user) throw new ValidationError('Nome ou senha inválidos', StatusCodes.UNAUTHORIZED)

		if (!(await bcrypt.compare(data.password, user.password))) {
			throw new ValidationError('Nome ou senha inválidos', StatusCodes.UNAUTHORIZED)
		}

		const token = jwt.sign({ id: user.id, role: user.role }, <string>config.AUTH_SECRET, {
			expiresIn: 3600,
		})

		return {
			access_token: token,
			expires_in: 3600,
		}
	}
}
