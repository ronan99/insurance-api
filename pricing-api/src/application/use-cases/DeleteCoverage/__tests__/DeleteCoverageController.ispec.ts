import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import request from 'supertest'
import { App } from '../../../../app'
import config from '../../../../config'

const server = new App().server

describe('DeleteCoverageController', () => {
	let fakeUserAdmin = {
		id: randomUUID(),
		username: faker.person.fullName(),
		password: 'FakePass@1234',
		role: 'ADMIN',
	}

	let coverage1: string = ''
	const auth = jwt.sign({ id: fakeUserAdmin, role: fakeUserAdmin.role }, <string>config.AUTH_SECRET, {
		expiresIn: 3600,
	})

	beforeAll(async () => {
		const response1 = await request(server)
			.post('/coverage')
			.send({
				name: faker.commerce.productName(),
				description: faker.commerce.productDescription(),
				capital: 10000,
				premium: 10,
			})
			.set('Authorization', `Bearer ${auth}`)
		coverage1 = response1.body.data.coverageId
	})

	test('It should delete a coverage sucessfully', async () => {
		const response = await request(server).delete(`/coverage/${coverage1}`).set('Authorization', `Bearer ${auth}`)

		expect(response.status).toBe(StatusCodes.OK)
		expect(response.body).toHaveProperty('data')
	})
	test('It should give error for coverage not found', async () => {
		const response = await request(server).delete(`/coverage/randomid`).set('Authorization', `Bearer ${auth}`)

		expect(response.status).toBe(StatusCodes.NOT_FOUND)
		expect(response.body).toHaveProperty('error')
	})
})
