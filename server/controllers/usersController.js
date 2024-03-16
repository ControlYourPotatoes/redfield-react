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

  createPayment: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
      const newPayment = await UserModel.createPayment(pool, req.body);
      res.status(201).json(newPayment);
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

  getPolicyById: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
      const policy = await UserModel.getPolicyById(pool, req.params.id);
      if (!policy) {
        return res.status(404).json({ message: 'Policy not found' });
      }
      res.json(policy);
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

  getPaymentById: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
        const payment = await UserModel.getPaymentById(pool, req.params.id); // Assuming 'id' in the URL is the 'userId'
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(payment);
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

  deletePolicyById: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
      const policy = await UserModel.deletePolicyById(pool, req.params.id);
      if (!policy) {
        return res.status(404).json({ message: 'Policy not found' });
      }
      res.json({ message: 'Policy deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deletePaymentById: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
      const payment = await UserModel.deletePaymentById(pool, req.params.id);
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updatePaymentById: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
      const payment = await UserModel.updatePaymentById(pool, req.params.id, req.body);
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      res.json(payment);
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
  },

  updatePolicyById: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
      const policy = await UserModel.updatePolicyById(pool, req.params.id, req.body);
      if (!policy) {
        return res.status(404).json({ message: 'Policy not found' });
      }
      res.json(policy);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    const pool = req.app.locals.pool;
    try {
      const { email, password } = req.body;
      const loginResult = await UserModel.login(pool, email, password);
      
      // Check if login was successful
      if (loginResult.success) {
        // Login successful, return the token
        res.json({ token: loginResult.token });
      } else {
        // Login failed, return an error message
        // It's generally a good practice to use a 401 status code for authentication failures
        res.status(401).json({ message: loginResult.message });
      }
    } catch (error) {
      // Log the error for debugging purposes
      console.error(`Login error: ${error.message}`);
      // Return a generic error message to the client
      res.status(500).json({ error: 'An error occurred during the login process.' });
    }
  },
  
};

  

module.exports = userController;
