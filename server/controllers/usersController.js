const pool = require('../config/db');

const getUsers = async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users');
  res.send(rows);
};
  
  const createUser = (req, res) => {
    res.send('User created');
  };
  
  module.exports = {
    getUsers,
    createUser,
  };
  