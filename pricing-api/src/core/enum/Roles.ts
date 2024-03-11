export const Roles: {
	USER: 'USER'
	ADMIN: 'ADMIN'
} = {
	USER: 'USER',
	ADMIN: 'ADMIN',
}

export type Roles = (typeof Roles)[keyof typeof Roles]
