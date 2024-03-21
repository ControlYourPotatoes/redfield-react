const jwt = require('jsonwebtoken');


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

  createPolicy: async (
    pool,
    { userId, type, address, coordinates, status }
  ) => {
    // Query no longer includes expirationDate explicitly
    const query = `
      INSERT INTO policy (userId, type, address, coordinates, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    // The values array does not include expirationDate
    const values = [userId, type, address, JSON.stringify(coordinates), status];

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

  getAllPayments: async (pool) => {
    const query = "SELECT * FROM payment";

    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching all payments: ${error.message}`);
    }
  },

  getAllUsers: async (pool) => {
    const query =
      "SELECT id, firstName, lastName, phone, email, password FROM users";

    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching all users: ${error.message}`);
    }
  },

  getAllPolicies: async (pool) => {
    const query = "SELECT * FROM policy";

    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching all policies: ${error.message}`);
    }
  },

  getUserById: async (pool, id) => {
    const query = "SELECT * FROM users WHERE id = $1";

    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${id} - ${error.message}`);
    }
  },

  getPolicyById: async (pool, userId) => {
    const query = "SELECT * FROM policy WHERE userId = $1";

    try {
      const { rows } = await pool.query(query, [userId]);
      if (rows.length > 0) {
        return rows[0];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(
        `Error fetching policy by userId: ${userId} - ${error.message}`
      );
    }
  },

  getPaymentById: async (pool, userId) => {
    const query = "SELECT * FROM payment WHERE userId = $1";
    try {
      const { rows } = await pool.query(query, [userId]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(
        `Error fetching payment by userId: ${userId} - ${error.message}`
      );
    }
  },

  deletePolicyById: async (pool, id) => {
    const query = "DELETE FROM policy WHERE userId = $1 RETURNING id";

    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error deleting policy by ID: ${id} - ${error.message}`);
    }
  },

  deleteUserById: async (pool, id) => {
    const query = "DELETE FROM users WHERE id = $1 RETURNING id";

    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error deleting user by ID: ${id} - ${error.message}`);
    }
  },

  updateUserById: async (
    pool,
    id,
    { firstName, lastName, phone, email, password }
  ) => {
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
  },

  updatePolicyById: async (
    pool,
    id,
    { userId, type, address, coordinates, status }
  ) => {
    const query = `
      UPDATE policy
      SET userId = $1, type = $2, address = $3, coordinates = $4, status = $5
      WHERE id = $6
      RETURNING *;
    `;
    const values = [
      userId,
      type,
      address,
      JSON.stringify(coordinates),
      status,
      id,
    ];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error(`Error updating policy by ID: ${id} - ${error.message}`);
    }
  },

  login: async (pool, email, password) => {
    const query = 'SELECT * FROM users WHERE email = $1';
  
    try {
      const { rows } = await pool.query(query, [email]);
      if (rows.length > 0) {
        const user = rows[0];
        console.log(`Comparing login password: '${password}' with stored password: '${user.password}'`);

        const validPassword = password.trim() === user.password.trim();
        console.log(`Checking user `, user);

        if (validPassword) {
          // Generate the token without including sensitive data
          const token = jwt.sign({ id: user.id, email: user.email, firstName: user.firstname, lastName: user.lastname }, 'secret', { expiresIn: '1h' });
          return { success: true, token: token };
        } else {
          // If the password is invalid, return an object indicating failure but do not throw an error here
          return { success: false, message: 'Invalid credentials' };
        }
      } else {
        // If no user is found, return an object indicating failure but do not throw an error here
        return { success: false, message: 'User not found' };
      }
    } catch (error) {
      // Propagate a database or other internal errors as needed
      throw new Error(`Error logging in: ${error.message}`);
    }
  },
  
};

module.exports = UserModel;
