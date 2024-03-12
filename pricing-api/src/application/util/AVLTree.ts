import AgeFactorEntity from '../../domain/entities/AgeFactorEntity'

class AVLNode {
	data: AgeFactorEntity
	height: number
	left: AVLNode | null
	right: AVLNode | null

	constructor(data: AgeFactorEntity) {
		this.data = data
		this.height = 1
		this.left = null
		this.right = null
	}
}

export default class AVLTree {
	root: AVLNode | null

	constructor() {
		this.root = null
	}

	private getHeight(node: AVLNode | null): number {
		return node ? node.height : 0
	}

	private getBalanceFactor(node: AVLNode | null): number {
		return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0
	}

	private updateHeight(node: AVLNode): void {
		node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1
	}

	private rotateRight(y: AVLNode): AVLNode {
		const x = y.left as AVLNode
		const T2 = x.right as AVLNode

		x.right = y
		y.left = T2

		this.updateHeight(y)
		this.updateHeight(x)

		return x
	}

	private rotateLeft(x: AVLNode): AVLNode {
		const y = x.right as AVLNode
		const T2 = y.left as AVLNode

		y.left = x
		x.right = T2

		this.updateHeight(x)
		this.updateHeight(y)

		return y
	}

	insert(data: AgeFactorEntity): void {
		this.root = this.insertNode(this.root, data)
	}

	private insertNode(node: AVLNode | null, data: AgeFactorEntity): AVLNode {
		if (!node) {
			return new AVLNode(data)
		}

		if (data.age < node.data.age) {
			node.left = this.insertNode(node.left, data)
		} else if (data.age > node.data.age) {
			node.right = this.insertNode(node.right, data)
		} else {
			return node
		}

		this.updateHeight(node)

		const balance = this.getBalanceFactor(node)

		if (balance > 1) {
			if (data.age < node.left!.data.age) {
				return this.rotateRight(node)
			} else {
				node.left = this.rotateLeft(node.left!)
				return this.rotateRight(node)
			}
		}

		if (balance < -1) {
			if (data.age > node.right!.data.age) {
				return this.rotateLeft(node)
			} else {
				node.right = this.rotateRight(node.right!)
				return this.rotateLeft(node)
			}
		}

		return node
	}

	search(age: number): AVLNode | null {
		return this.searchNode(this.root, age)
	}

	private searchNode(node: AVLNode | null, age: number): AVLNode | null {
		if (!node) {
			return null
		}

		if (age === node.data.age) {
			return node
		}

		if (age < node.data.age) {
			const leftResult = this.searchNode(node.left, age)
			return leftResult ? leftResult : node
		}

		const rightResult = this.searchNode(node.right, age)
		return rightResult
	}
}
