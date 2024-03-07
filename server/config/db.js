const { Pool } = require('pg');
require('dotenv').config();

async function createDatabasePool() {
  // Determine the host based on the environment
  const host = process.env.INSTANCE_CONNECTION_NAME ? `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}` : process.env.DB_HOST;

  const pool = new Pool({
    user: process.env.DB_USER,
    host: host,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT || 5432, // Default PostgreSQL port
  });

  // Test the connection
  try {
    await pool.query('SELECT 1+1 AS result');
    console.log('Database connection successful.');
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }

  return pool;
}

module.exports = createDatabasePool;
