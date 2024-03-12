export interface ICalculateQuoteRequestDTO {
	age: number
	occupationCode: string | number
	capital: number
	coverages: (string | number)[]
}

export interface ICalculateQuoteResponseDTO {
	ageFactor: number
	occupationFactor: number
	coverages: Coverage[] | null
	capital: number
	premium: number
}

interface Coverage {
	coverageId: string | number
	premium: number
}
