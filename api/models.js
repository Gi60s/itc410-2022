const dynamo = require('dynamodb')
const Joi = require('joi')

exports.Account = dynamo.define('Account', {
    hashKey: 'accountId',
    schema: {
        accountId: Joi.string().required(),
        username: Joi.string().required(),
        name: Joi.string().required(),
        password: Joi.string().required()
    }
})

exports.Task = dynamo.define('Task', {
    hashKey: 'taskId',
    schema: {
        taskId: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        dueDate: Joi.date(),
        completed: Joi.date()
    }
})