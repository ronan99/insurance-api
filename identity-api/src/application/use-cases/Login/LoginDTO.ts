export interface ILoginRequestDTO {
	username: string
	password: string
}

export interface ILoginResponseDTO {
	user: User
	token: string
}

type User = {
	userId: string | number
	username: string
	role: string
}
