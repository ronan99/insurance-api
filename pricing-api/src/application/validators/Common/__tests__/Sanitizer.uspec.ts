import Sanitizer from '../Sanitizer'

describe('Sanitizer', () => {
	test('Should sanitize html', async () => {
		const htmlText = '<a>should pass this</a>'

		const result = Sanitizer.sanitizeString(htmlText)

		expect(result).toBe('should pass this')
	})
	test('Should sanitize SQL', async () => {
		const sqlTest = 'SELECT * FROM table;'
		const result = Sanitizer.sanitizeString(sqlTest)
		expect(result).toBe(' *  table;')
	})
	test('Should transform a number in string format to number format', async () => {
		const number = '1234'

		const result = Sanitizer.sanitizeNumber(number)

		expect(typeof result).toBe('number')
		expect(result).toBe(1234)
	})

	test('Should return 0 for not a number', async () => {
		const number = 'asassasa'

		const result = Sanitizer.sanitizeNumber(number)

		expect(typeof result).toBe('number')
		expect(result).toBe(0)
	})
})
