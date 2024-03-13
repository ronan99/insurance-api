import { StatusCodes } from 'http-status-codes'

export default class ValidationError extends Error {
	message: string
	statusCode: number

	constructor(message: string, statusCode?: number) {
		super(message)
		this.message = message
		this.statusCode = statusCode || StatusCodes.BAD_REQUEST
	}
}
