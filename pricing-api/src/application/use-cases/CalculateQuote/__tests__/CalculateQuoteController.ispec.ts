import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import request from 'supertest'
import { App } from '../../../../app'
import config from '../../../../config'

const server = new App().server

describe('CalculateQuoteController', () => {
	let fakeUserAdmin = {
		id: randomUUID(),
		username: faker.person.fullName(),
		password: 'FakePass@1234',
		role: 'ADMIN',
	}
	let coverage1: string = ''

	let coverage2: string = ''

	const auth = jwt.sign({ id: fakeUserAdmin, role: fakeUserAdmin.role }, <string>config.AUTH_SECRET, {
		expiresIn: 3600,
	})
	beforeAll(async () => {
		const response1 = await request(server)
			.post('/coverage')
			.send({
				name: faker.commerce.productName(),
				description: faker.commerce.productName(),
				capital: 10000,
				premium: 10,
			})
			.set('Authorization', `Bearer ${auth}`)
		coverage1 = response1.body.data.coverageId

		const response2 = await request(server)
			.post('/coverage')
			.send({
				name: faker.commerce.productName(),
				description: faker.commerce.productName(),
				capital: 15000,
				premium: 20,
			})
			.set('Authorization', `Bearer ${auth}`)
		coverage2 = response2.body.data.coverageId
	})

	test('Should get a quote sucessfully', async () => {
		const response = await request(server)
			.get(`/quote`)
			.send({
				age: 26,
				occupationCode: 223280,
				capital: 100000,
				coverages: [coverage1, coverage2],
			})
			.set('Authorization', `Bearer ${auth}`)

		expect(response.status).toBe(StatusCodes.OK)
		expect(response.body).toHaveProperty('data')
		const result = response.body.data

		expect(result.ageFactor).toBe(1.75)
		expect(result.occupationFactor).toBe(1.02)
		expect(result.capital).toBe(100000)
		expect(result.premium).toBe(428.4)
		expect(result.coverages).toEqual(expect.arrayContaining([expect.objectContaining({ coverageId: coverage1, premium: 178.5 })]))
		expect(result.coverages).toEqual(expect.arrayContaining([expect.objectContaining({ coverageId: coverage2, premium: 249.9 })]))
	})

	test('Should gives an error for age not given', async () => {
		const response = await request(server)
			.get(`/quote`)
			.send({
				occupationCode: 223280,
				capital: 100000,
				coverages: [coverage1, coverage2],
			})
			.set('Authorization', `Bearer ${auth}`)

		expect(response.status).toBe(StatusCodes.BAD_REQUEST)
		expect(response.body).toHaveProperty('error')
	})
	test('Should gives an error for occupation not given', async () => {
		const response = await request(server)
			.get(`/quote`)
			.send({
				age: 26,
				capital: 100000,
				coverages: [coverage1, coverage2],
			})
			.set('Authorization', `Bearer ${auth}`)

		expect(response.status).toBe(StatusCodes.BAD_REQUEST)
		expect(response.body).toHaveProperty('error')
	})
	test('Should gives an error for capital not given', async () => {
		const response = await request(server)
			.get(`/quote`)
			.send({
				age: 26,
				occupationCode: 223280,
				coverages: [coverage1, coverage2],
			})
			.set('Authorization', `Bearer ${auth}`)

		expect(response.status).toBe(StatusCodes.BAD_REQUEST)
		expect(response.body).toHaveProperty('error')
	})
	test('Should gives an error for coverage not given', async () => {
		const response = await request(server)
			.get(`/quote`)
			.send({
				age: 26,
				occupationCode: 223280,
				capital: 10000,
				coverages: [],
			})
			.set('Authorization', `Bearer ${auth}`)

		expect(response.status).toBe(StatusCodes.BAD_REQUEST)
		expect(response.body).toHaveProperty('error')
	})
})
