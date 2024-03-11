export function successResponse<T>(data: T | null = null) {
	return {
		data: data,
	}
}

export function failResponse(message: string, status = 500) {
	return {
		error: {
			code: status,
			message: message,
		},
	}
}
