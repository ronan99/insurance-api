import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt, { JwtPayload } from 'jsonwebtoken'

export default async function UserAuth(req: Request, res: Response, next: NextFunction) {
	const authSecret = <string>process.env.AUTH_SECRET
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token não informado!' })
		}
		const parts = authHeader.split(' ')
		if (!(parts.length === 2)) {
			return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token mal formatado!' })
		}
		const [scheme, token] = parts
		if (!/^Bearer$/i.test(scheme)) {
			return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token mal formatado!' })
		}
		if (authSecret) {
			try {
				const decoded = <JwtPayload>jwt.verify(token, authSecret)
				if (!decoded) return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token inválido!' })
			} catch (error) {
				return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Ocorreu um erro, contate o administrador!' })
			}
		} else {
			return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Ocorreu um erro, contate o administrador!' })
		}
	} catch {
		return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token inválido!' })
	}
	return next()
}
