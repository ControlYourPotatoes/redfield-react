const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/users', usersController.getAllUsers);
router.post('/users', usersController.createUser);
router.post('/users/:userId/policy', usersController.createPolicy);
router.post('/users/:userId/payment', usersController.createPayment);
router.delete('/users/:id', usersController.deleteUserById);
router.put('/users/:id', usersController.updateUserById);
router.get('/users/:id', usersController.getUserById);

router.post('/submitForm', usersController.submitForm);

module.exports = router;
