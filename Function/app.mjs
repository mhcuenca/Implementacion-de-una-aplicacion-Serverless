mport pkg from 'pg';
import AWS from '@aws-sdk/client-secrets-manager';

const {SecretsManagerClient, GetSecretValueCommand} = AWS;
const { Pool } = pkg;

const secretName = process.env.DB_SECRET_NAME;

const secretsManager = new SecretsManagerClient();
const getSecretCommand = new GetSecretValueCommand({SecretId: secretName});

export const lambdaHandler = async (event) => {

    const secretValue = await secretsManager.send(getSecretCommand);
    const dbCredentials = JSON.parse(secretValue.SecretString);
    const pool = new Pool({
    user: dbCredentials.username,
    host: dbCredentials.Host,
    database: dbCredentials.dbname,
    password: dbCredentials.password,
    port: dbCredentials.Port,
    });
    

const client = await pool.connect();
const fecha = event.queryStringParameters && event.queryStringParameters.fecha;

    // Validar que la fecha está presente en la solicitud
    if (!fecha) {
    return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Falta el parámetro de fecha' }),
    };
    }

try {
    const result = await client.query(`SELECT Valor FROM tasa_cambio WHERE Fecha = '${fecha}'`);
    const dataFromDatabase = result.rows;
    console.log(result.rows);
    
    return {
    statusCode: 200,
    body: JSON.stringify({
        message: 'El tipo de cambio es',
        data: dataFromDatabase}),
    };
} catch (error) {
    console.error(error);
    
    return {
    statusCode: 500,
    body: JSON.stringify('Internal Server Error'),
    };
} finally {
    client.release();
}
};
