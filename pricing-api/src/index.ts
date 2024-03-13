import { App } from './app'
const server = new App().server

server.listen(9000, () => {
	console.log('Rodando na porta 9000')
})
