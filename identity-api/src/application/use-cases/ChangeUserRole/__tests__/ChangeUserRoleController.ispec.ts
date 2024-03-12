import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import request from 'supertest'
import { App } from '../../../../app'
import config from '../../../../config'

const server = new App().server

describe('ChangeUserRoleController', () => {
	let fakeUserAdmin = {
		id: randomUUID(),
		username: faker.person.fullName(),
		password: 'FakePass@1234',
		role: 'ADMIN',
	}
	let fakeUser = {
		id: randomUUID(),
		username: faker.person.fullName(),
		password: 'FakePass@1234',
		role: 'USER',
	}
	const auth = jwt.sign({ id: fakeUserAdmin, role: fakeUserAdmin.role }, <string>config.AUTH_SECRET, {
		expiresIn: 3600,
	})
	beforeEach(async () => {
		fakeUser = {
			id: randomUUID(),
			username: faker.person.fullName(),
			password: 'FakePass@1234',
			role: 'USER',
		}
		const response = await request(server).post('/users').send(fakeUser).set('Authorization', `Bearer ${auth}`)
		fakeUser.id = response.body.data.userId
	})

	test('Should update a role from a user sucessfully', async () => {
		const response = await request(server).patch(`/users/${fakeUser.id}`).send({ role: 'ADMIN' }).set('Authorization', `Bearer ${auth}`)

		expect(response.status).toBe(StatusCodes.OK)
		expect(response.body).toHaveProperty('data')
	})

	test('Should throw not found error', async () => {
		const response = await request(server).patch(`/users/<>`).send({ role: 'ADMIN' }).set('Authorization', `Bearer ${auth}`)

		expect(response.status).toBe(StatusCodes.BAD_REQUEST)
		expect(response.body).toHaveProperty('error')
	})

	test('Should throw bad request error. No role passed', async () => {
		const response = await request(server).patch(`/users/${fakeUser.id}`).set('Authorization', `Bearer ${auth}`)

		expect(response.status).toBe(StatusCodes.BAD_REQUEST)
		expect(response.body).toHaveProperty('error')
	})
	test('Should gives error for invalid role', async () => {
		const response = await request(server).patch(`/users/${fakeUser.id}`).send({ role: 'aaaa' }).set('Authorization', `Bearer ${auth}`)

		expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY)
		expect(response.body).toHaveProperty('error')
	})
})
