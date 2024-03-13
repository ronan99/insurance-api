export default class Sanitizer {
	sqlKeywords = /SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE/gi
	htmlTagPattern = /<[^>]*>/g
	static sanitizeString(value: string | number): string {
		if (!value) return ''
		if (typeof value !== 'string') {
			value = value.toString()
		}
		const sanitizer = new Sanitizer()

		return value.replace(sanitizer.htmlTagPattern, '').replace(sanitizer.sqlKeywords, '')
	}

	static sanitizeNumber(value: string | number): number {
		if (!value) return 0

		if (typeof value === 'string') {
			const parsedNumber = parseFloat(value)
			if (isNaN(parsedNumber)) {
				return 0
			}
			return this.sanitizeNumber(parsedNumber)
		}

		const num = Number(value)

		if (isNaN(num) || typeof num === 'undefined') {
			return 0
		}

		return value
	}

	static sanitizeStringList(value: string[]): string[] {
		if (!value) return []
		if (!Array.isArray(value) || !value.length) {
			return []
		}
		let result = []
		for (let val of value) {
			result.push(this.sanitizeString(val))
		}
		return result
	}
}
