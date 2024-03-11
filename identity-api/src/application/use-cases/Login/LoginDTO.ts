export interface ILoginRequestDTO {
	username: string
	password: string
}

export interface ILoginResponseDTO {
	access_token: string
	expires_in: number
}
