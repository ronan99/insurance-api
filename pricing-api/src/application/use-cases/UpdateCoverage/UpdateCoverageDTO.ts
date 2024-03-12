export interface IUpdateCoverageRequestDTO {
	name?: string
	description?: string
	capital?: number
	premium?: number
}

export interface IUpdateCoverageResponseDTO {
	coverageId: string | number
	name: string
	description: string
	capital: number
	premium: number
}
