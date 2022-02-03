const expect = require('chai').expect
const app = require('../api/server')
const request = require('supertest')

describe('server', () => {

	describe('accounts', () => {
		it('can create an account', () => {
			// The supertest request function returns a promise.
			// Remember that one way to run asynchronous tests
			// is to return a promise.
			return request(app)
				.post('/api/accounts')
				.send({
					username: 'bob12',
					name: 'Bob',
					password: 'notBob'
				})
				.expect(201)
		})

		it('can delete an account', () => {
			return request(app)
				.delete('/api/accounts/account-id')
				.send()
				.expect(204)
		})

		it('can login', () => {
			return request(app)
				.put('/api/accounts/account-id/login')
				.send({ password: 'a-secret' })
				.expect(200)
		})

		it('can logout', () => {
			return request(app)
				.put('/api/accounts/account-id/logout')
				.send()
				.expect(200)
		})
	})

	describe('tasks', () => {
		it('can get tasks', () => {
			return request(app)
				.get('/api/tasks')
				.send()
				.expect(200)
				.then(res => {
					expect(res.body).to.be.an('array')
				})
		})

		it('can create a task', () => {
			return request(app)
				.post('/api/tasks')
				.send({
					title: 'My Task',
					description: '',
					dueDate: '2030-01-01T00:00:00.000Z',
					completed: null
				})
				.expect(201)
		})
	})
})