require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('./storage/dbConnect');

const migrationsPath = path.resolve(__dirname, './storage/migrations');
const migrationFiles = fs.readdirSync(migrationsPath);

(async function runMigrations() {
  for (let i = 0; migrationFiles[i]; i++) {
    const fileName = migrationFiles[i];
    try {
      const data = fs.readFileSync(`${migrationsPath}/${fileName}`).toString();
      await pool.promise().query(data);
      console.log(`\x1b[32m%s\x1b[0m`, `Migration succesfull: ${fileName}`);
    } catch (err) {
      console.log(`\x1b[31m%s\x1b[0m`, `Migration failed: ${fileName}`);
      console.log(err);
    }
  }
})();