import OccupationEntity from '../entities/OccupationEntity'
import { BaseRepository } from './BaseRepository'

export interface IOccupationRepository extends BaseRepository<OccupationEntity> {
	findByCode(code: string | number): Promise<OccupationEntity | null>
}
