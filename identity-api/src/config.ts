import dotenv from 'dotenv'
dotenv.config()

interface ENV {
	AUTH_SECRET: string | undefined
}

const getConfig = (): ENV => {
	return {
		AUTH_SECRET: process.env.AUTH_SECRET,
	}
}

const config = getConfig()

export default config
