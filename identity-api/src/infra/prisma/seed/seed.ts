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
	console.log(admin)
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
