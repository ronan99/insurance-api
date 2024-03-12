import CoverageEntity from '../entities/CoverageEntity'
import { BaseRepository } from './BaseRepository'

export interface ICoverageRepository extends BaseRepository<CoverageEntity> {
	findByName(name: string): Promise<CoverageEntity | null>
	findByIdWithDeleted(id: string): Promise<CoverageEntity | null>
	findByNameWithDeleted(id: string): Promise<CoverageEntity | null>
	findByIdList(ids: (string | number)[]): Promise<CoverageEntity[] | null>
}
