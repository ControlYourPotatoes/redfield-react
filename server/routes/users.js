const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const hurricaneData = require('../HurricanePath/mariaPath.json');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

router.post('/login', usersController.login);
router.post('/signup', usersController.createUser);

router.get('/users', usersController.getAllUsers);
router.put('/users', usersController.updateUserById);
router.delete('/users/:id', usersController.deleteUserById);
router.put('/users/:id', usersController.updateUserById);
router.get('/users/:id', usersController.getUserById);

router.get('/policy', usersController.getAllPolicies);
router.post('/policy', usersController.createPolicy);
router.delete('/policy/:id', usersController.deletePolicyById);
router.get('/policy/:id', usersController.getPolicyById);

router.get('/payment', usersController.getAllPayments);
router.post('/:userId/payment', usersController.createPayment);
router.get('/payment/:id', usersController.getPaymentById);

console.log(process.env.GMAIL_USER, process.env.GMAIL_APP_PASSWORD);



// Add a new route to serve the hurricane data
router.get('/hurricane', (req, res) => {
  try {
    if (!hurricaneData) throw new Error('Hurricane data not found');
    res.json(hurricaneData);
  } catch (error) {
    console.error("Error serving hurricane data:", error);
    res.status(500).json({ message: error.message });
  }
});




let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail app password
  },
});

// Define your signature HTML
// const emailSignature = `
// <div style="margin-top: 20px;">
//   <p>Best regards,</p>
//   <p>H-Redfield</p>
//   <img src="cid:signatureImage" alt="Signature" style="width: 100px; height: auto;">
// </div>
// `;

// Function to send an email with HTML content and embedded Redfield logo
function sendNotificationEmail(message, subject, recipient) {
 // const emailSignature = `<div style="margin-top: 20px;"><img src="cid:redfieldLogo" alt="Redfield Logo" style="width: 100px; height: auto;"></div>`;
//  const emailContent = message + emailSignature;

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
        path: '../public/assets/icon/RedfieldLogo.png', // Adjust the path as necessary
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
 

router.post('/send-notification', (req, res) => {
  const { message, subject, recipient } = req.body;
  sendNotificationEmail(message, subject, recipient);
  res.json({ message: 'Email sent successfully' });
});

module.exports = router;