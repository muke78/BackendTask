require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');

const dbConnection = {
  host: process.env.DB_HOST_ESCRITURA,
  user: process.env.DB_USER,
  password: process.env.BD_PASS,
  database: process.env.BD_NAME,
  connectTimeout: 30000,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
};

const pool = new Pool(dbConnection);

pool.on('connect', () => {
  console.log('Conexión exitosa a la base de datos');
});

pool.on('error', (err) => {
  console.error('Error en la conexión a la base de datos', err);
});

module.exports = {
  pool,
};
