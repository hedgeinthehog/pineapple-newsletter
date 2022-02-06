const pool = require('./dbConnect');

class DbStorage {
  constructor(tableName) {
    this._table = tableName;
  }

  async getAll() {
    try {
      const [rows] = await pool
        .promise()
        .execute(`SELECT * FROM ${this._table}`);
      return rows;
    } catch (e) {
      throw new Error(e);
    }
  }
  async getById(id) {
    try {
      const [rows] = await pool.promise().execute(
        `
        SELECT * 
        FROM ${this._table} 
        WHERE id_${this._table} = ?`,
        [id],
      );

      return rows[0];
    } catch (e) {
      throw new Error(e);
    }
  }
  async create(data) {
    try {
      const { email } = data;

      const [meta] = await pool
        .promise()
        .execute(`INSERT INTO ${this._table} (email) VALUES (?)`, [email]);

      return Object.assign({}, data, { [`id_${this._table}`]: meta.insertId });
    } catch (e) {
      throw new Error(e);
    }
  }
  async remove(id) {
    if (!id) throw new Error(`Missing "id" in data for DbStorage.update`);
    try {
      await pool
        .promise()
        .execute(`DELETE FROM ${this._table} WHERE id_${this._table} =?`, [id]);
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = DbStorage;
