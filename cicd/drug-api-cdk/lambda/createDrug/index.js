const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require ("@aws-sdk/util-dynamodb");
const { v4: uuidv4 } = require("uuid");

const client = new DynamoDBClient();

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const id = uuidv4();
    const now = new Date().toISOString();
    const item = {
        id: { S: id },
        name: { S: body.name },
        manufacturer: { S: body.manufacturer },
        quantity: { N: body.quantity.toString() },
        type: { S: body.type },
        price: { N: body.price.toString() },
        source: { S: body.source || "" },
        created_at: { S: now },
        updated_at: { S: now }
    };
    await client.send(new PutItemCommand({
        TableName: 'DrugsTable',
        Item: item
    }));
    return { statusCode: 201,
                headers: { 'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"}, body: JSON.stringify(unmarshall(item)) };
};