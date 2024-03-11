import { NextFunction, Request, Response } from 'express'

export const ErrorHandler = (err: Error, _: Request, res: Response, next: NextFunction) => {
	next(res.status(500).send({ errors: [{ message: 'Something went wrong', type: typeof err }] }))
}
