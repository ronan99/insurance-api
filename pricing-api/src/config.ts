import dotenv from 'dotenv'

dotenv.config()

if (process.env.NODE_ENV == 'test') {
	dotenv.config({ path: '.env.test', override: true })
}

interface ENV {
	AUTH_SECRET: string | undefined
	DATABASE_URL: string | undefined
	NODE_ENV: string | undefined
}

const getConfig = (): ENV => {
	return {
		NODE_ENV: process.env.NODE_ENV,
		AUTH_SECRET: process.env.AUTH_SECRET,
		DATABASE_URL: process.env.DATABASE_URL,
	}
}

const config = getConfig()

export default config
