import CoverageEntity from '../entities/CoverageEntity'
import { BaseRepository } from './BaseRepository'

export interface ICoverageRepository extends BaseRepository<CoverageEntity> {
	findByName(name: string): Promise<CoverageEntity | null>
	findByNameDeleted(name: string): Promise<CoverageEntity | null>
}
