const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001; // Use a different port if your React app runs on 3000

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'user_data'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

// API endpoint to handle signup form submission
app.post('/signup', (req, res) => {
  const { name, phoneNumber, email } = req.body;
  const sql = 'INSERT INTO signups (name, phone_number, email) VALUES (?, ?, ?)';
  
  connection.query(sql, [name, phoneNumber, email], (error, results) => {
    if (error) {
      return res.status(500).send('Error in saving to database');
    }
    res.status(200).send('Signup successful');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
