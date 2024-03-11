import express from 'express'
import userRouter from '../application/routes'

const server = express()

server.use('/users', userRouter)

export default server
