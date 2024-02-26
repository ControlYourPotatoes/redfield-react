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

const getUsers = async (req, res) => {
  try {
    // Assuming you have a model function to fetch all users
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching users.", error: error.toString() });
  }
};