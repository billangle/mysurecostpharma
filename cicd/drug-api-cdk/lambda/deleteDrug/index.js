const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient();

exports.handler = async (event) => {
    const id = event.pathParameters.id;
    await client.send(new DeleteItemCommand({
        TableName: 'DrugsTable',
        Key: { id: { S: id } }
    }));
    return { statusCode: 204, 
                headers: { 'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"},
                body: "" };
};