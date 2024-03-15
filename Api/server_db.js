require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001; // Make sure this doesn't conflict with your React app's port
app.use(cors()); // This enables CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// Replace these values with your database connection details
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Configure Nodemailer setup
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail password or App Password
  },
});

// Route for handling sign-ups
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1 OR phone_number = $2', [email, phoneNumber]);
    
    if (existingUser.rows.length > 0) {
      return res.status(400).send('Email or phone number already exists.');
    }

    const newUser = await pool.query(
      'INSERT INTO users (first_name, last_name, phone_number, email, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [firstName, lastName, phoneNumber, email, hashedPassword]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Route for handling Log In
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(400).send('User not found.');
    }

    const isValidPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    console.log(`Password comparison result: ${isValidPassword}`); // Logging the comparison result

    if (!isValidPassword) {
      return res.status(401).send('Invalid password.');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Route for handling Forgot Password
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  console.log('Forgot password request received for:', email); // Log received email
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length > 0) {
      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetTokenExpires = new Date();
      resetTokenExpires.setHours(resetTokenExpires.getHours() + 1); // Token expires in 1 hour
      console.log('User found:', user.rows.length > 0);

      await pool.query('UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3', 
        [resetToken, resetTokenExpires, email]);

      // Define the email options
      let mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
              `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
              `http://server-web-zyogoegwka-uk.a.run.app//reset-password/${resetToken}\n\n` +
              `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send('Error sending email');
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send('If the email is registered, a password reset link will be sent.');
        }
      });
    } else {
      // To prevent email enumeration, always return the same message whether the email was found or not
      res.status(200).send('If the email is registered, a password reset link will be sent.');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Password reset endpoint
app.post('/api/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    // Step 1: Verify the token
    // Assuming your users table has a reset_token column for storing password reset tokens
    const userQuery = await pool.query('SELECT * FROM users WHERE reset_token = $1', [token]);

    if (userQuery.rows.length === 0) {
      return res.status(400).send('Invalid or expired reset token.');
    }

    const user = userQuery.rows[0];

    // Optional: Check if the token has expired
    // Assuming there's a reset_token_expires column of type TIMESTAMP
    const tokenExpires = new Date(user.reset_token_expires).getTime();
    if (Date.now() > tokenExpires) {
      return res.status(400).send('Reset token has expired.');
    }

    // Step 2: Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 3: Update the user's password in the database
    // Optionally, clear the reset token and its expiry time to invalidate the token
    await pool.query('UPDATE users SET password_hash = $1, reset_token = NULL, reset_token_expires = NULL WHERE id = $2', [hashedPassword, user.id]);

    res.send('Password has been reset successfully.');
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send('Server error during password reset.');
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
