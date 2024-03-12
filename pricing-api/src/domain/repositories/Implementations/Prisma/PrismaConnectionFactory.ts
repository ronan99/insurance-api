import { PrismaClient } from '@prisma/client'

export default class PrismaConnectionFactory {
	static getConnection(): PrismaClient {
		switch (process.env.NODE_ENV) {
			case 'dev':
				return new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } })
			case 'test':
				return new PrismaClient({ datasources: { db: { url: process.env.DATABASE_TESTING_URL } } })
			default:
				return new PrismaClient()
		}
	}
}
