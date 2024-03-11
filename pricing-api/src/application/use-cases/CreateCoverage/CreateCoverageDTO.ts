export interface ICreateCoverageRequestDTO {
	name: string
	description: string
	capital: number
	premium: number
}

export interface ICreateCoverageResponseDTO {
	coverageId: string | number
	name: string
	description: string
	capital: number
	premium: number
}
