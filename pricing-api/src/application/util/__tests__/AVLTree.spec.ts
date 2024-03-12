import AgeFactorEntity from '../../../domain/entities/AgeFactorEntity'
import AVLTree from '../AVLTree'

describe('AVLTree', () => {
	let avlTree: AVLTree

	beforeEach(() => {
		avlTree = new AVLTree()
	})

	test('Inserting and searching nodes', () => {
		const nodes: AgeFactorEntity[] = []

		nodes.push(new AgeFactorEntity({ age: 18, factor: 1.18 }))
		nodes.push(new AgeFactorEntity({ age: 25, factor: 1.25 }))
		nodes.push(new AgeFactorEntity({ age: 30, factor: 1.3 }))

		nodes.forEach((node) => {
			avlTree.insert(node)
		})

		const foundNode = avlTree.search(20)
		expect(foundNode?.data.age).toBe(25)
		expect(foundNode?.data.factor).toBe(1.25)
	})

	test('Should return node with exatcly age given', () => {
		const nodes: AgeFactorEntity[] = []

		nodes.push(new AgeFactorEntity({ age: 18, factor: 1.18 }))
		nodes.push(new AgeFactorEntity({ age: 25, factor: 1.25 }))
		nodes.push(new AgeFactorEntity({ age: 30, factor: 1.3 }))

		nodes.forEach((node) => {
			avlTree.insert(node)
		})

		const foundNode = avlTree.search(18)
		expect(foundNode?.data.age).toBe(18)
		expect(foundNode?.data.factor).toBe(1.18)
	})

	test('Should return correctly with balance negative rotate left', () => {
		const nodes: AgeFactorEntity[] = []

		nodes.push(new AgeFactorEntity({ age: 60, factor: 1.6 }))
		nodes.push(new AgeFactorEntity({ age: 50, factor: 1.5 }))
		nodes.push(new AgeFactorEntity({ age: 40, factor: 1.4 }))

		nodes.forEach((node) => {
			avlTree.insert(node)
		})

		const foundNode = avlTree.search(41)
		expect(foundNode?.data.age).toBe(50)
		expect(foundNode?.data.factor).toBe(1.5)
	})
	test('Should return correctly with balance positive rotate right', () => {
		const nodes: AgeFactorEntity[] = []

		nodes.push(new AgeFactorEntity({ age: 40, factor: 1.4 }))
		nodes.push(new AgeFactorEntity({ age: 50, factor: 1.5 }))
		nodes.push(new AgeFactorEntity({ age: 60, factor: 1.6 }))

		nodes.forEach((node) => {
			avlTree.insert(node)
		})

		const foundNode = avlTree.search(41)
		expect(foundNode?.data.age).toBe(50)
		expect(foundNode?.data.factor).toBe(1.5)
	})

	test('Should return correctly with balance positive rotate left', () => {
		const nodes: AgeFactorEntity[] = []

		nodes.push(new AgeFactorEntity({ age: 40, factor: 1.4 }))
		nodes.push(new AgeFactorEntity({ age: 60, factor: 1.6 }))
		nodes.push(new AgeFactorEntity({ age: 50, factor: 1.5 }))

		nodes.forEach((node) => {
			avlTree.insert(node)
		})

		const foundNode = avlTree.search(41)
		expect(foundNode?.data.age).toBe(50)
		expect(foundNode?.data.factor).toBe(1.5)
	})

	test('Should return correctly with balance negative rotate right', () => {
		const nodes: AgeFactorEntity[] = []

		nodes.push(new AgeFactorEntity({ age: 40, factor: 1.4 }))
		nodes.push(new AgeFactorEntity({ age: 60, factor: 1.6 }))
		nodes.push(new AgeFactorEntity({ age: 50, factor: 1.5 }))

		nodes.forEach((node) => {
			avlTree.insert(node)
		})

		const foundNode = avlTree.search(41)
		expect(foundNode?.data.age).toBe(50)
		expect(foundNode?.data.factor).toBe(1.5)
	})

	test('Should return correctly inserting nodes with same age', () => {
		const nodes: AgeFactorEntity[] = []

		nodes.push(new AgeFactorEntity({ age: 40, factor: 1.4 }))
		nodes.push(new AgeFactorEntity({ age: 40, factor: 1.4 }))
		nodes.push(new AgeFactorEntity({ age: 60, factor: 1.6 }))
		nodes.push(new AgeFactorEntity({ age: 50, factor: 1.5 }))

		nodes.forEach((node) => {
			avlTree.insert(node)
		})

		const foundNode = avlTree.search(41)
		expect(foundNode?.data.age).toBe(50)
		expect(foundNode?.data.factor).toBe(1.5)
	})
	test('Not found node when searching tree empty', () => {
		const tree = new AVLTree()

		const notFoundNode = tree.search(18)

		expect(notFoundNode).toBeNull()
	})
})
