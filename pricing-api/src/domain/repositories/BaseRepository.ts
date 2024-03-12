export interface BaseRepository<T> {
	findById(id: string | number): Promise<T | null>
	save(value: T): Promise<T>
	update(value: T, id: string | number): Promise<T | null>
	delete(id: string | number): Promise<boolean>
}
