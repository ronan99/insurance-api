import express from 'express'
import router from '../application/routes'

const server = express()

server.use('/', router)

export default server
