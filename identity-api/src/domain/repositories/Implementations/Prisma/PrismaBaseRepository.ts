import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'
import PrismaConnectionFactory from './PrismaConnectionFactory'

@injectable()
export class PrismaBaseRepository {
	prisma: PrismaClient
	constructor() {
		this.prisma = PrismaConnectionFactory.getConnection()
	}
}
