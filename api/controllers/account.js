const accounts = require('../database/account')

module.exports = function (pool) {
	return {
		async createAccount (req, res) {
			const { username, name, password } = req.enforcer.body
			const accountId = await accounts.createAccount(pool, username, name, password)
			if (accountId) {
				res.set('location', '/api/accounts/' + accountId)
					.enforcer
					.status(201)
					.send()
			} else {
				res.enforcer.status(409).send()
			}
		},

		async getAccount (req, res) {
			const user = req.user
			res.enforcer.status(200).send({
				name: user.name,
				username: user.username
			})
		},

		async getAccountByUsername (req, res) {
			const { username } = req.enforcer.params
			const account = await accounts.getAccountByUsername(client, username)
			if (account.account_id !== req.user.id) {
				res.enforcer.status(403).send()
			} else {
				res.enforcer.status(200).send({
					name: account.name,
					username: account.username
				})
			}
		},

		async updateAccount (req, res) {
			const data = req.enforcer.body
			const { username } = req.enforcer.params

			const client = await pool.connect()
			try {
				await client.query('BEGIN')
				let account = await accounts.getAccountByUsername(client, username)
				if (account === undefined) {
					res.enforcer.status(404).send()
				} else if (account.account_id !== req.user.id) {
					res.enforcer.status(403).send()
				} else {
					await accounts.updateAccount(client, req.user.id, data)
					res.enforcer.status(200).send()
				}
				await client.query('COMMIT')
			} catch (e) {
				await client.query('ROLLBACK')
				throw e
			} finally {
				client.release()
			}
		},

		async deleteAccount (req, res) {
			const { username } = req.enforcer.params
			try {
				await client.query('BEGIN')
				let account = await accounts.getAccountByUsername(client, username)
				if (account === undefined) {
					res.enforcer.status(204).send()
				} else if (account.account_id !== req.user.id) {
					res.enforcer.status(403).send()
				} else {
					await accounts.deleteAccount(pool, account.id)
					res.enforcer.status(200).send()
				}
				await client.query('COMMIT')
			} catch (e) {
				await client.query('ROLLBACK')
				throw e
			} finally {
				client.release()
			}
		},

		async login (req, res) {

		},

		async logout (req, res) {

		}
	}
}