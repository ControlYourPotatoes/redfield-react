require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer'); // testing for mailing 
const app = express();
const PORT = process.env.PORT || 8080; // Ensure this port is free or change it as needed

//login/signup
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


app.use(cors()); // This enables CORS for all routes
app.use(express.json()); // To parse JSON bodies
app.use(bodyParser.json());

// Mock data 
const hurricaneData = {
  id: "hurricane-2023",
  name: "maria path",
  path: [
    { lat: 15.300950405816799, lon: -61.14722058940372 },
    { lat: 15.496900874274315, lon: -61.42172327156733 },
    { lat: 15.504840911058787, lon: -61.78955686566656 },
    { lat: 15.78254889643838, lon: -61.94327836767818 },
    { lat: 16.263788712992472, lon: -62.50880652450269 },
    { lat: 16.706245820976356, lon: -63.14565274712228 },
    { lat: 17.000650300618915, lon: -63.91426025718039 },
    { lat: 17.252629719964716, lon: -64.74874841095777 },
    { lat: 17.60823401763877, lon: -65.10972975149825 },
    { lat: 17.903812824345135, lon: -65.65050003536057 },
    { lat: 18.168443000287972, lon: -66.12406725621298 },
    { lat: 18.387515360022565, lon: -66.53033122581512 },
    { lat: 18.49694743514779, lon: -66.98600567820672 },
    { lat: 19.183191950554438, lon: -67.59013552915108 },
    { lat: 19.318028343252212, lon: -67.81522772852523 },
    { lat: 19.76323026084966, lon: -68.17757126898121 },
  ]
};

// Configure Nodemailer setup
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail password or App Password
  },
});

// send an email
function sendNotificationEmail(message) {
  let mailOptions = {
    from: process.env.GMAIL_USER, // place your email
    to: 'carl-frank7@hotmail.com', // Set the recipient email address
    subject: 'Hurricane Alert',
    text: message,
  };
  
  transporter.sendMail(mailOptions,function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// API endpoint for hurricane data
app.get('/api/hurricane', (req, res) => {
  res.json(hurricaneData);
});

// Adjust the endpoint to extract the message from the request body
app.post('/api/send-notification', (req, res) => {
  const { message } = req.body; // Extract message from the request body
  sendNotificationEmail(message); // Pass the message to the email function
  res.json({ message: 'Email sent successfully' });
});


  //login/signup
  // Database setup
// Assume a mock database or use an actual DB like MongoDB, PostgreSQL, etc.
const users = []; // This should be replaced with actual database logic

app.post('/api/signup', async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  
  // Check if the user already exists (this is simplified for demonstration)
  const userExists = users.some(user => user.email === email);
  if (userExists) {
      return res.status(400).send('User already exists');
  }
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Save the user to your database
  users.push({ email, password: hashedPassword, firstName, lastName, phoneNumber }); // Simplified for demonstration
  // Return response
  res.status(201).send('User created');
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  // Find the user by email
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).send('User not found');
  }
  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid credentials');
  }
  // Generate JWT token
  const token = jwt.sign({ email: user.email }, 'secret', { expiresIn: '1h' });
  res.status(200).json({ token });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});