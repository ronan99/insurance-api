import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import { failResponse } from '../shared/Response'

export default async function AdminAuth(req: Request, res: Response, next: NextFunction) {
	const authSecret = <string>config.AUTH_SECRET
	try {
		const authHeader = req.headers.authorization

		if (!authHeader) {
			return res.status(StatusCodes.UNAUTHORIZED).json(failResponse('Token não informado!', StatusCodes.UNAUTHORIZED))
		}
		const parts = authHeader.split(' ')
		if (!(parts.length === 2)) {
			return res.status(StatusCodes.UNAUTHORIZED).json(failResponse('Token mal formatado!', StatusCodes.UNAUTHORIZED))
		}
		const [scheme, token] = parts
		if (!/^Bearer$/i.test(scheme)) {
			return res.status(StatusCodes.UNAUTHORIZED).json(failResponse('Token mal formatado!', StatusCodes.UNAUTHORIZED))
		}
		if (authSecret) {
			try {
				const decoded = <JwtPayload>jwt.verify(token, authSecret)
				if (!decoded) return res.status(StatusCodes.UNAUTHORIZED).json(failResponse('Token inválido!', StatusCodes.BAD_REQUEST))
			} catch (error) {
				return res.status(StatusCodes.UNAUTHORIZED).json(failResponse('Não autorizado', StatusCodes.UNAUTHORIZED))
			}
		} else {
			return res.status(StatusCodes.UNAUTHORIZED).json(failResponse('Ocorreu um erro, contate o administrador!', StatusCodes.UNAUTHORIZED))
		}
	} catch {
		return res.status(StatusCodes.UNAUTHORIZED).json(failResponse('Token inválido!', StatusCodes.UNAUTHORIZED))
	}
	return next()
}
