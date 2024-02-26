const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/users', usersController.getAllUsers);
router.post('/users', usersController.createUser);
router.delete('/users/:id', usersController.deleteUserById);
router.put('/users/:id', usersController.updateUserById);
router.get('/users/:id', usersController.getUserById);

module.exports = router;
