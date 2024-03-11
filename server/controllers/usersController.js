const UserModel = require('../models/user');

const userController = {
  createUser: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
      const newUser = await UserModel.createUser(pool, req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createPolicy: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
      const newPolicy = await UserModel.createPolicy(pool, req.body);
      res.status(201).json(newPolicy);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllPolicies: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
      const policies = await UserModel.getAllPolicies(pool);
      res.json(policies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createPayment: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
      const newPayment = await UserModel.createPayment(pool, req.body);
      res.status(201).json(newPayment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllPayments: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
      const payments = await UserModel.getAllPayments(pool);
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
      const users = await UserModel.getAllUsers(pool);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
      const user = await UserModel.getUserById(pool, req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUserById: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
      const user = await UserModel.deleteUserById(pool, req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUserById: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
      const user = await UserModel.updateUserById(pool, req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = userController;
