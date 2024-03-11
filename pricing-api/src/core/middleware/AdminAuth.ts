import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import { Roles } from '../enum/Roles'

export default async function AdminAuth(req: Request, res: Response, next: NextFunction) {
	const authSecret = config.AUTH_SECRET
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
				if (!decoded.role || decoded.role != Roles.ADMIN) return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Não autorizado para esta ação' })
			} catch (error) {
				return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token inválido!' })
			}
		} else {
			return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Ocorreu um erro, contate o administrador!' })
		}
	} catch {
		return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token inválido!' })
	}
	return next()
}
