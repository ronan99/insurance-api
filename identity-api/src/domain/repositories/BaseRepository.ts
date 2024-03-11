export interface BaseRepository<T> {
	findById(id: string | number): Promise<T | null>
	save(user: T): Promise<T>
	update(user: T, id: string | number): Promise<T | null>
	delete(id: string | number): Promise<boolean>
}
