import pkg from 'pg';
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";





export const handler = async (event) => {

  const client = new SecretsManagerClient();
  const secretData = await client.send(
    new GetSecretValueCommand({
      SecretId: process.env.DB_SECRET_ARN,
    }),
  );

  const sql = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TABLE drugs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    type TEXT NOT NULL,  -- e.g., tablet, capsule, liquid, etc.
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    source TEXT,         -- optional: source system or format
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
  
  const secret = JSON.parse(secretData.SecretString);
  console.log ("Secret: ", secret);
/*
  const pgclient = new pkg.Client({
    user: secret.username,
    host: process.env.DB_HOST,
    database: 'postgres', // Connect to default DB
    password: secret.password,
    port: 5432,
    ssl: {
      rejectUnauthorized: false, // For self-signed certificates
    },
  });
  
   console.log('Connecting to PostgreSQL ' +  secret.password + " : "  + process.env.DB_HOST);

  try {
    await pgclient.connect();
    console.log('Connected to PostgreSQL');
    
    // SQL commands to create the schema
    //const createSchemaQuery = 'CREATE SCHEMA IF NOT EXISTS thrive;';
    //CREATE DATABASE dbname;
    const createSchemaQuery = 'CREATE DATABASE pharmacy;';
    await pgclient.query(createSchemaQuery);
    console.log('Database created ');
   
    await pgclient.end();
    console.log('Session ended ');
  } catch (err) {
    console.error('Error running SQL query', err.stack);
    //throw new Error(err);
  }
  
  
  try {
     await pgclient.end();
  } catch (xx) {}
*/
  try {
    const pgclient2 = new pkg.Client({
        user: secret.username,
        host: process.env.DB_HOST,
        database: 'postgres', 
        password: secret.password,
        port: 5432,
        ssl: {
          rejectUnauthorized: false, // For self-signed certificates
        },
      });

    try {
         await pgclient2.connect();
        await pgclient2.query(sql);
        console.log('Schema created ' + sql);

    }catch (err) {
      console.error('Error running SQL query', err.stack);
      //throw new Error(err);
    }
    
    try {
      await pgclient2.end();
    } catch (ex) {}

  } catch (errx) {
    console.log ("got errx: " + errx);
  }
 

}