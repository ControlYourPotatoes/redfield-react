const pool = require('../config/db');

const UserModel = {
  createUser: async ({ firstName, lastName, phone, email, address }) => {
    const query = `
      INSERT INTO users (firstName, lastName, phone, email, address)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, firstName, lastName, phone, email, address;
    `;
    const values = [firstName, lastName, phone, email, address];
    
    console.log("Creating user with values:", values); // Log values being inserted

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error creating user:", error); // Log error
      throw error;
    }
  },

  getAllUsers: async () => {
    const query = 'SELECT id, firstName, lastName, phone, email, address FROM users';
    console.log("Fetching all users"); // Log action

    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error fetching all users:", error); // Log error
      throw error;
    }
  },

  getUserById: async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    console.log(`Fetching user by ID: ${id}`); // Log action

    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error fetching user by ID: ${id}`, error); // Log error
      throw error;
    }
  },

  deleteUserById: async (id) => {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
    console.log(`Deleting user by ID: ${id}`); // Log action

    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error deleting user by ID: ${id}`, error); // Log error
      throw error;
    }
  },

  updateUserById: async (id, { firstName, lastName, phone, email, address }) => {
    const query = `
      UPDATE users
      SET firstName = $1, lastName = $2, phone = $3, email = $4, address = $5
      WHERE id = $6
      RETURNING id, firstName, lastName, phone, email, address;
    `;
    const values = [firstName, lastName, phone, email, address, id];
    console.log(`Updating user by ID: ${id} with values:`, values); // Log action and values

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error(`Error updating user by ID: ${id}`, error); // Log error
      throw error;
    }
  }
};

  createPolicy = async ({ userId, type, coordinates }) => {
  // Construct the query to insert a policy record
  // Assuming your policy table has columns (userId, type, coordinates)
  const query = `
    INSERT INTO policy (userId, type, coordinates)
    VALUES ($1, $2, $3)
    RETURNING *; // Returns all columns of the newly inserted row
  `;
  const values = [userId, type, JSON.stringify(coordinates)]; // Assuming coordinates is an object or array

  try {
    const { rows } = await pool.query(query, values);
    return rows[0]; // Return the inserted policy record
  } catch (error) {
    console.error("Error creating policy:", error);
    throw error;
  }
};

  createPayment = async ({ userId, type, payment, amount }) => {
  // Construct the query to insert a payment record
  // Assuming your payment table has columns (userId, type, payment, amount)
  const query = `
    INSERT INTO payment (userId, type, payment, amount)
    VALUES ($1, $2, $3, $4)
    RETURNING *; // Returns all columns of the newly inserted row
  `;
  const values = [userId, type, payment.details, amount]; // Assuming card is an object with type and number
  
  try {
    const { rows } = await pool.query(query, values);
    return rows[0]; // Return the inserted payment record
  }
  catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
}

module.exports = UserModel;
