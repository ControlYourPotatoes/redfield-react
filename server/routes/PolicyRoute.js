// policyPaymentRoutes.js

const express = require('express');
const router = express.Router();
const PolicyPaymentController = require('../controllers/PolicyPaymentController');

// Assuming you have separate controller methods for these operations
router.post('/users/:userId/policy', PolicyPaymentController.createPolicy);
router.post('/users/:userId/payment', PolicyPaymentController.createPayment);

module.exports = router;
