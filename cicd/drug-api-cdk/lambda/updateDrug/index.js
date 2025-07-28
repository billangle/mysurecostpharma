const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient();

exports.handler = async (event) => {
    const id = event.pathParameters.id;
    const body = JSON.parse(event.body);
    const now = new Date().toISOString();
    await client.send(new UpdateItemCommand({
        TableName: 'DrugsTable',
        Key: { id: { S: id } },
        UpdateExpression: "SET #name=:n, manufacturer=:m, quantity=:q, #type=:t, price=:p, updated_at=:u",
        ExpressionAttributeNames: {
            "#name": "name",
            "#type": "type"
        },
        ExpressionAttributeValues: {
            ":n": { S: body.name },
            ":m": { S: body.manufacturer },
            ":q": { N: body.quantity.toString() },
            ":t": { S: body.type },
            ":p": { N: body.price.toString() },
            ":u": { S: now }
        }
    }));
    return { statusCode: 200, 
                headers: { 'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"},
                body: JSON.stringify({ message: "Updated" }) };
};