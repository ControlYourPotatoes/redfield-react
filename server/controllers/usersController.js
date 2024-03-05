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
  
  handleSubmitForm: async (req, res) => {
    const { personalInfo, policy, payment } = req.body;
    
    try {
      // Assuming createUser method is adapted to return the user's ID or the full user object
      const newUser = await UserModel.createUser(personalInfo);
  
      // Assuming you will add createPolicy and createPayment methods to UserModel
      const newPolicy = await UserModel.createPolicy({ userId: newUser.id, ...policy });
      const newPayment = await UserModel.createPayment({ userId: newUser.id, ...payment });
  
      // Respond with the created entities or a success message
      res.status(201).json({
        message: "Form data submitted successfully",
        user: newUser,
        policy: newPolicy,
        payment: newPayment,
      });
    } catch (error) {
      console.error("Error handling form submission:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Add a new method to the userController object
};


module.exports = userController;
