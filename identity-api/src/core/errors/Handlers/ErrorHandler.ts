import { NextFunction, Request, Response } from 'express'

export const ErrorHandler = (err: Error, _: Request, res: Response, next: NextFunction) => {
	console.log(JSON.stringify(err))
	return next(res.status(500).send({ message: 'Erro interno', type: typeof err }))
}
