import { App } from './app'

const server = new App().server

server.listen(3030, () => {
	console.log('Rodando na porta 3030')
})
