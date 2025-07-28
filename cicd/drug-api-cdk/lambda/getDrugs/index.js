const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient();

exports.handler = async () => {
    const data = await client.send(new ScanCommand({ TableName: 'DrugsTable' }));
    const items = data.Items.map(item => ({
        id: item.id.S,
        name: item.name.S,
        manufacturer: item.manufacturer.S,
        quantity: Number(item.quantity.N),
        type: item.type.S,
        price: Number(item.price.N),
        source: item.source.S,
        created_at: item.created_at.S,
        updated_at: item.updated_at.S
    }));
    return { statusCode: 200, 
                headers: { 'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"},
                body: JSON.stringify(items) };
};