import { PrismaClient } from '@prisma/client'
import config from '../../../../config'

export default class PrismaConnectionFactory {
	static getConnection(): PrismaClient {
		return new PrismaClient({ datasources: { db: { url: config.DATABASE_URL } } })
	}
}
