const AWS = require('aws-sdk')
const dynamo = require('dynamodb')
require('./models')

const dbClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_DYNAMODB_ENDPOINT
})

dynamo.createTables(err => {
    if (err){
        console.error(err.stack)
    } else {
        console.log('Dynamodb tables ready')
    }
})