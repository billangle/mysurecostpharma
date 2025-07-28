const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient();

exports.handler = async (event) => {
    const id = event.pathParameters.id;
    const data = await client.send(new GetItemCommand({
        TableName: 'DrugsTable',
        Key: { id: { S: id } }
    }));
    console.log ("Got id: " + id);
    if (!data.Item) return { statusCode: 404, 
                headers: { 'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"},
                body: "Not Found" };
    const item = data.Item;
    return {
        statusCode: 200,
                headers: { 'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify({
            id: item.id.S,
            name: item.name.S,
            manufacturer: item.manufacturer.S,
            quantity: Number(item.quantity.N),
            type: item.type.S,
            price: Number(item.price.N),
            source: item.source.S,
            created_at: item.created_at.S,
            updated_at: item.updated_at.S
        })
    };
};