import { Pool } from 'pg';

process.loadEnvFile();

const dbConnection = {
  host: process.env.DB_HOST_ESCRITURAPG,
  user: process.env.DB_USERPG,
  password: process.env.BD_PASSPG,
  database: process.env.BD_NAMEPG,
  port: 5432,
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
