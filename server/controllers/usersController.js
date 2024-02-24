const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    // Handle errors, e.g., duplicate email
    res.status(400).json({ error: error.message });
  }
};