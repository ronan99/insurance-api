import express from 'express'
import router from '../application/routes'
import AdminAuth from '../core/middleware/AdminAuth'

const server = express()

server.use('/', router)

server.get('/', AdminAuth, (_, res) => {
	return res.sendStatus(200)
})

export default server
