import { NextFunction, Request, Response } from 'express'

export const ErrorHandler = (err: Error, _: Request, res: Response, next: NextFunction) => {
	return next(res.status(500).send({ message: 'Erro interno', type: typeof err }))
}
