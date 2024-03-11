import UserEntity from '../entities/UserEntity'
import { BaseRepository } from './BaseRepository'

export interface IUserRepository extends BaseRepository<UserEntity> {
	findByUsername(username: string): Promise<UserEntity | null>
}
