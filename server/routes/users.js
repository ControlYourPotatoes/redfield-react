const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/users', usersController.getAllUsers);
router.post('/users', usersController.createUser);
router.delete('/users/:id', usersController.deleteUserById);
router.put('/users/:id', usersController.updateUserById);
router.get('/users/:id', usersController.getUserById);

router.get('/policy', usersController.getAllPolicies);
router.post('/policy', usersController.createPolicy);
router.delete('/policy/:id', usersController.deletePolicyById);
router.get('/policy/:id', usersController.getPolicyById);

router.get('/payment', usersController.getAllPayments);
router.post('/:userId/payment', usersController.createPayment);



module.exports = router;
