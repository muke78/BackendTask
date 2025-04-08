import { pool } from '../config/configPostSQL.js';

const connectionQuery = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool
      .query(sql, params)
      .then((results) => {
        resolve(results.rows);
      })
      .catch((error) => {
        console.error('Error en la consulta a la base de datos', error);
        reject(error);
      });
  });
};

module.exports = { connectionQuery };
