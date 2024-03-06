const UserModel = require('../models/user');

const userController = {
  createUser: async (req, res) => {
    try {
      const newUser = await UserModel.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createPolicy: async (req, res) => {
    try {
      const newPolicy = await UserModel.createPolicy(req.body);
      res.status(201).json(newPolicy);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createPayment: async (req, res) => {
    try {
      const newPayment = await UserModel.createPayment(req.body);
      res.status(201).json(newPayment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  submitForm: async (req, res) => {
    const { personalInfo, policy, payment } = req.body;
    
    try {
      // Assuming createUser, createPolicy, and createPayment are functions that return the created entity
      const user = await createUser(personalInfo);
      const userPolicy = await createPolicy({ ...policy, userId: user.id });
      const userPayment = await createPayment({ ...payment, userId: user.id });
  
      res.status(201).json({ user, userPolicy, userPayment });
    } catch (error) {
      res.status(500).json({ message: "Error submitting form", error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUserById: async (req, res) => {
    try {
      const user = await UserModel.updateUserById(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },    
  
  // Add a new method to the userController object
};


module.exports = userController;
