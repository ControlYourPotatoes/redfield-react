const pool = require('../config/db');

const createUser = async (userData) => {
  const { name, email, password } = userData;
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, password]
  );
  return result.rows[0];
};

module.exports = { createUser };
