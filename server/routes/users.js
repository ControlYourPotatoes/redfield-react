const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const hurricaneData = require('../models/hurricane');

router.post('/login', usersController.login);
router.post('/signup', usersController.createUser);

router.get('/users', usersController.getAllUsers);
router.put('/users', usersController.updateUserById);
router.delete('/users/:id', usersController.deleteUserById);
router.put('/users/:id', usersController.updateUserById);
router.get('/users/:id', usersController.getUserById);

router.get('/policy', usersController.getAllPolicies);
router.post('/:userId/policy', usersController.createPolicy);
router.delete('/policy/:id', usersController.deletePolicyById);
router.get('/policy/:id', usersController.getPolicyById);

router.get('/payment', usersController.getAllPayments);
router.post('/:userId/payment', usersController.createPayment);
router.get('/payment/:id', usersController.getPaymentById);

router.get('/api/hurricane', (req, res) => {
    res.json(hurricaneData);
  });

module.exports = router;
