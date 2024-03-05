const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // Node.js module for generating the reset token

const router = express.Router();

// Dummy function to simulate database lookup
async function findUserByEmail(email) {
  // Implement actual database lookup here
  return { id: '123', email };
}

// Dummy function to update the user with a reset token
async function setUserResetToken(userId, token) {
  // Implement actual database update here
}

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  // Transporter configuration
  // See https://nodemailer.com/about/ for more info
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  
  if (user) {
    const resetToken = crypto.randomBytes(20).toString('hex');
    await setUserResetToken(user.id, resetToken);

    // Construct reset password URL
    const resetUrl = `http://yourfrontend.com/reset-password?token=${resetToken}`;

    // Send email
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Please go to this URL to reset your password: ${resetUrl}`,
    });

    res.json({ message: 'If your email address exists in our database, you will receive a password reset email shortly.' });
  } else {
    // Responding the same way whether the user exists or not
    // helps prevent email enumeration attacks.
    res.json({ message: 'If your email address exists in our database, you will receive a password reset email shortly.' });
  }
});

module.exports = router;
