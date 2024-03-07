const UserModel = {
  createUser: async (pool, { firstName, lastName, phone, email, password }) => {
    const query = `
      INSERT INTO users (firstName, lastName, phone, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, firstName, lastName, phone, email, password;
    `;
    const values = [firstName, lastName, phone, email, password];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  },

  createPolicy: async (pool, { userId, type, coordinates }) => {
    const query = `
      INSERT INTO policy (userId, type, coordinates)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [userId, type, JSON.stringify(coordinates)];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error(`Error creating policy: ${error.message}`);
    }
  },

  createPayment: async (pool, { userId, type, paymentDetails, amount }) => {
    const query = `
      INSERT INTO payment (userId, type, paymentDetails, amount)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [userId, type, JSON.stringify(paymentDetails), amount];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error(`Error creating payment: ${error.message}`);
    }
  },

  getAllUsers: async (pool) => {
    const query = 'SELECT id, firstName, lastName, phone, email, password FROM users';
    
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching all users: ${error.message}`);
    }
  },

  getUserById: async (pool, id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    
    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${id} - ${error.message}`);
    }
  },

  deleteUserById: async (pool, id) => {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
    
    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error deleting user by ID: ${id} - ${error.message}`);
    }
  },

  updateUserById: async (pool, id, { firstName, lastName, phone, email, password }) => {
    const query = `
      UPDATE users
      SET firstName = $1, lastName = $2, phone = $3, email = $4, password = $5
      WHERE id = $6
      RETURNING id, firstName, lastName, phone, email, password;
    `;
    const values = [firstName, lastName, phone, email, password, id];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error(`Error updating user by ID: ${id} - ${error.message}`);
    }
  }
};

module.exports = UserModel;
