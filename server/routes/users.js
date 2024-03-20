const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const hurricaneData = require('../HurricanePath/mariaPath.json');

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

module.exports = router;

