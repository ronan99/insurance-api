import { readFile } from 'fs/promises'
import AgeFactorEntity from '../../domain/entities/AgeFactorEntity'
import AVLTree from './AVLTree'

export default class AgeFactor {
	constructor(private readonly ageFactorTree: AVLTree) {}

	static async getFactor(age: number): Promise<AgeFactorEntity | null> {
		const tree = new AVLTree()
		const ageFactor = new AgeFactor(tree)
		await ageFactor.readAgeFactorFile()

		const factor = ageFactor.ageFactorTree.search(age)

		if (!factor || !factor.data) return Promise.resolve(null)

		return Promise.resolve(factor.data)
	}

	private async readAgeFactorFile() {
		try {
			const data = await readFile('seed/ages.json', 'utf-8')
			const jsonData = JSON.parse(data)
			for (let ageFactor of jsonData) {
				this.ageFactorTree.insert(new AgeFactorEntity(ageFactor))
			}
		} catch (error) {
			console.error('Erro lendo arquivo de ages.json')
			throw new Error('Erro interno, contate administrador')
		}
	}
}
