const bcrypt = require('bcryptjs')
const uuid = require('uuid').v4

exports.createAccount = async function (client, username, name, password) {
    const accountId = uuid()
    const { rowCount } = await client.query({
        name: 'create-account',
        text: 'INSERT INTO accounts (account_id, username, name, password) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
        values: [
            accountId,
            username,
            name,
            await encryptPassword(password)	
        ]
    })
    return rowCount > 0 ? accountId : undefined
}

exports.getAccount = async function (client, accountId) {
    const { rows } = await client.query({
        name: 'get-account-by-id',
        text: 'SELECT * FROM accounts WHERE account_id=$1',
        values: [accountId]
    })
    return rows[0]
}

exports.getAccountByUsername = async function (client, username) {
    const { rows } = await client.query({
        name: 'get-account-by-username',
        text: 'SELECT * FROM accounts WHERE username=$1',
        values: [username]
    })
    return rows[0]
}

exports.updateAccount = async  function (client, accountId, data) {
    // create dynamic query based on inputs
    const { username, name, password } = data
    const values = []
    const sets = []

    if (username !== undefined) {
        values.push(username)
        sets.push('username=$' + values.length)
    }

    if (name !== undefined) {
        values.push(name)
        sets.push('name=$' + values.length)
    }

    if (password !== undefined) {
        values.push(await encryptPassword(password))
        sets.push('password=$' + values.length)
    }

    // if no properties were passed in then there is nothing to update
    if (values.length === 0) return await exports.getAccount(client, accountId)

    values.push(accountId)
    const { rows } = await client.query({
        name: 'update-account',
        text: 'UPDATE accounts SET ' + sets.join(', ') + ' WHERE account_id=$' + (values.length) + ' RETURNING *',
        values
    })
    return rows[0]
}

exports.deleteAccount = async function (client, accountId) {
    const { rowCount } = await client.query({
        name: 'delete-account',
        text: 'DELETE FROM accounts WHERE account_id=$1',
        values: [accountId]
    })
    return rowCount > 0
}

async function encryptPassword (password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}