// In a new file, e.g., PolicyPaymentModel.js
const pool = require('../config/db');

const PolicyPaymentModel = {
  createPolicy: async ({ userId, type, coordinates }) => {
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
    console.error("Error creating policy:", error);
    throw error;
  }
  },


  createPayment: async ({ userId, type, paymentDetails, amount }) => {
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
    console.error("Error creating payment:", error);
    throw error;
  }
  },
};

module.exports = PolicyPaymentModel;
