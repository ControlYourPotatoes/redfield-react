const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: '35.224.182.91',
  database: 'round-dispatch-414819:us-central1:db-redfield',
  password: '',
  port: 5432,
});

module.exports = pool;
