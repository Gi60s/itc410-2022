const { Account } = require('../database/models')
const bcrypt = require('bcryptjs')
const uuid = require('uuid').v4

exports.createAccount = async function (req, res) {
    const { username, name, password } = req.enforcer.body
	const salt = await bcrypt.genSalt(10)
	const accountId = uuid()
    await Account.create({
		accountId,
        username,
		name,
		password: await bcrypt.hash(password, salt)
    })
	res.enforcer
		.set('location', '/api/accounts/' + accountId)
		.status(201)
		.send()
}

exports.updateAccount = async function (req, res) {
    const { username, name, password } = req.enforcer.body
    const { accountId } = req.enforcer.params

    const account = await Account.get(accountId)
    if (account === undefined) {
        res.enforcer.status(404).send()
    } else {
        const properties = { accountId }
        if (username !== undefined) properties.username = username
        if (name !== undefined) properties.name = name
        if (password !== undefined) {
			// store password encoded
			const salt = await bcrypt.genSalt(10)
			properties.password = await bcrypt.hash(password, salt)
		}
        await Account.update(properties)
        res.enforcer.status(200).send()
    }
}

exports.deleteAccount = async function (req, res) {
    const { accountId } = req.enforcer.params
	await Account.destroy(accountId)
}

exports.login = async function (req, res) {

}

exports.logout = async function (req, res) {

}

async function encryptPassword (password) {
    const salt = bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}