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
		username: faker.person.fullName(),
		password: 'FakePass@1234',
		role: 'USER',
	}
	const auth = jwt.sign({ id: fakeUserAdmin, role: fakeUserAdmin.role }, <string>config.AUTH_SECRET, {
		expiresIn: 3600,
	})
	beforeAll(async () => {
		await request(server).post('/users').send(fakeUser).set('Authorization', `Bearer ${auth}`)
	})

	test('Should login sucessfully', async () => {
		const response = await request(server).post(`/users/login`).send(fakeUser).set('Authorization', `Bearer ${auth}`)

		expect(response.status).toBe(StatusCodes.CREATED)
		expect(response.body).toHaveProperty('data.access_token')
	})
})
