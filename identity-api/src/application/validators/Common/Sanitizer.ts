export default class Sanitizer {
	sqlKeywords = /SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE/gi
	htmlTagPattern = /<[^>]*>/g
	static sanitizeString(value: string): string {
		const sanitizer = new Sanitizer()

		return value.replace(sanitizer.htmlTagPattern, '').replace(sanitizer.sqlKeywords, '')
	}

	static sanitizeNumber(value: string) {
		return parseInt(value, 10)
	}
}
