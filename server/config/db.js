const { Pool } = require('pg');
const { CloudSqlConnectionPool } = require('@google-cloud/cloud-sql-connector');

async function createDatabasePool() {
  if (process.env.INSTANCE_CONNECTION_NAME) {
    // Use Cloud SQL Connector
    const pool = new CloudSqlConnectionPool();
    const connectionOptions = {
      // Adjust these options according to your Cloud SQL instance details
      instanceId: process.env.INSTANCE_CONNECTION_NAME,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      // Specify additional options as needed
    };

    // This example uses async/await syntax for simplicity.
    // Adapt to your preferred way of handling asynchronous operations as necessary.
    return pool.connect(connectionOptions);
  } else {
    // Fallback to direct TCP connection
    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST || 'localhost', // Fallback to localhost if DB_HOST is not set
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT || 5432, // Default PostgreSQL port
      // Specify other Pool options as needed
    });

    // Test the connection
    try {
      await pool.query('SELECT 1+1 AS result');
      console.log('Database connection (TCP) successful.');
    } catch (err) {
      console.error('Database connection (TCP) failed:', err);
      throw err;
    }

    return pool;
  }
}

module.exports = createDatabasePool;
