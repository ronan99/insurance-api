import 'reflect-metadata'

import cors from 'cors'
import express from 'express'
import { ErrorHandler } from './core/errors/Handlers/ErrorHandler'
import Routes from './routes/index'

export class App {
	public server: express.Application

	constructor() {
		this.server = express()
		this.server.disable('x-powered-by')
		this.server.use(cors())
		this.server.options('*', cors())
		this.server.set('trust proxy', true)
		this.middleware()
		this.routes()
		this.errors()
	}

	private middleware() {
		this.server.use(express.json({ limit: '50mb' }))
	}

	private routes() {
		this.server.use(Routes)
	}

	private errors() {
		this.server.use(ErrorHandler)
	}
}
