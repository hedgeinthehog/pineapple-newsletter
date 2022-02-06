require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  waitForConnections: true,
  connectionLimit: 10,
});

(async function createDB() {
  try {
    await pool
      .promise()
      .query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);
    console.log(`\x1b[32m%s\x1b[0m`, 'Database created successfully');
    pool.end();
  } catch (err) {
    console.log(`\x1b[31m%s\x1b[0m`, `Migration failed: ${err}`);
    pool.end();
  }
})();
