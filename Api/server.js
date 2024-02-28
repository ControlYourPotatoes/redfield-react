require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer'); // testing for mailing 
const app = express();
const port = 3001; // Ensure this port is free or change it as needed

app.use(cors()); // This enables CORS for all routes
app.use(express.json()); // To parse JSON bodies

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
    to: 'alexanderpuga78@gmail.com', // Set the recipient email address
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

// Root route serving a simple HTML page
app.get('/', (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>H-Redfield</title>
        <link rel="icon" href="/assets/favicon.ico" type="image/x-icon">
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
    `);
  });

// Start the server
app.listen(port, () => {
console.log(`Hurricane API running at http://localhost:${port}`);
});
