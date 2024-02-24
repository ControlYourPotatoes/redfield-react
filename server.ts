import express, { Request, Response } from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'H_Redfield', // Replace with your MySQL username
  password: 'H_Redfield_pwd', // Replace with your MySQL password
  database: 'H_Redfield_db' // Ensure this database exists
});

connection.connect(error => {
  if (error) {
    console.error('An error occurred while connecting to the database:', error);
    return;
  }
  console.log('Successfully connected to the database.');
});

app.post('/signup', (req: Request, res: Response) => {
  const { name, phoneNumber, email, address } = req.body;

  // Basic validation
  if (!name || !phoneNumber || !email || !address) {
    return res.status(400).send('Missing fields in request body');
  }

  const sql = 'INSERT INTO users (name, phone_number, email, address) VALUES (?, ?, ?, ?)';

  connection.query(sql, [name, phoneNumber, email, address], (error, results) => {
    if (error) {
      console.error('Error inserting data into database:', error);
      return res.status(500).send('Error in saving to database');
    }
    res.status(200).send('Signup successful');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
