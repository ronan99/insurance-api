import csvParser from 'csv-parser'
import fs from 'fs'
import PrismaConnectionFactory from '../../../domain/repositories/Implementations/Prisma/PrismaConnectionFactory'

const prisma = PrismaConnectionFactory.getConnection()

type Occupation = {
	Code: string
	Name: string
	Factor: string
	Active: string
}

async function main() {
	if (process.env.APPLY_SEED && (process.env.APPLY_SEED as string) == 'false') {
		console.log('Not seeded')
		return
	}
	const result: Occupation[] = []
	fs.createReadStream('seed/occupations.csv')
		.pipe(csvParser())
		.on('data', async (data: Occupation) => {
			result.push(data)
		})
		.on('end', async () => {
			try {
				await prisma.$transaction(async (tx) => {
					for (let data of result) {
						await tx.occupation.upsert({
							where: { code: data.Code },
							update: {
								code: data.Code,
								name: data.Name,
								factor: parseFloat(data.Factor),
								active: data.Active && data.Active == 'TRUE' ? true : false,
							},
							create: {
								code: data.Code,
								name: data.Name,
								factor: parseFloat(data.Factor),
								active: data.Active && data.Active == 'TRUE' ? true : false,
							},
						})
					}
				})
			} catch (error) {
				console.log(error)
			}
		})
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
