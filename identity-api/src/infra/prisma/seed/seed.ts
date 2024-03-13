import { Roles } from '@prisma/client'
import bcrypt from 'bcrypt'
import PrismaConnectionFactory from '../../../domain/repositories/Implementations/Prisma/PrismaConnectionFactory'
const prisma = PrismaConnectionFactory.getConnection()

async function main() {
	const password = 'Admin@1234'
	const pass = await bcrypt.hash(password, 10)

	const admin = await prisma.user.upsert({
		where: { username: 'admin' },
		update: {},
		create: {
			username: 'admin',
			password: pass,
			role: Roles.ADMIN,
		},
	})
	const user = await prisma.user.upsert({
		where: { username: 'stone user' },
		update: {},
		create: {
			username: 'stone user',
			password: pass,
			role: Roles.USER,
		},
	})
	console.table([admin, user])
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
