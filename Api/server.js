require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer'); // for mailing
const app = express();
const PORT =  8081; // Ensure this port is free or change it as needed

//login/signup
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');


app.use(cors()); // This enables CORS for all routes
app.use(express.json()); // To parse JSON bodies
app.use(bodyParser.json());

// Mock data
const hurricaneData = {
  id: "hurricane-2023",
  name: "Maria Path",
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
    pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail app password
  },
});


// Function to send an email with HTML content and embedded Redfield logo
function sendNotificationEmail(message, subject, recipient) {

const emailContent = `
<html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; }
      h2 { color: #333; }
    </style>
  </head>
  <body>
    ${message}
    <div style="margin-top: 20px;">
      <img src="cid:signatureImage" alt="Signature" style="width: 100px; height: auto;">
    </div>
  </body>
</html>`;

  let mailOptions = {
    from: process.env.GMAIL_USER, // place your email
    to: recipient, // Set the recipient email address
    subject: subject,
    html: emailContent,
    attachments: [
      {
        filename: 'signatureImage.png',
        path: path.join(__dirname, '../public/assets/icon/RedfieldLogo.png'), // Adjust the path as necessary
        cid: 'signatureImage' // Use this cid to reference the image in the HTML body
      }
    ]
  };
 

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

app.get('/api/hurricane', (req, res) => {
  res.json(hurricaneData);
});

// Endpoint to handle sending notifications
app.post('/api/send-notification', (req, res) => {
  const { message, subject, recipient } = req.body;
  sendNotificationEmail(message, subject, recipient);
  res.json({ message: 'Email sent successfully' });
});
// Root route serving a simple HTML page


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
