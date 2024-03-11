import express from 'express'
import coverageRouter from '../application/routes'
import AdminAuth from '../core/middleware/AdminAuth'

const server = express()

server.use('/coverage', coverageRouter)

server.get('/', AdminAuth, (_, res) => {
	return res.sendStatus(200)
})

export default server
