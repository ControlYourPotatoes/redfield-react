const PolicyPaymentModel = require('./path/to/PolicyPaymentModel');

const policyController = {
    createPolicy: async (req, res) => {
        try {
        const newPolicy = await PolicyPaymentModel.createPolicy(req.body);
        res.status(201).json(newPolicy);
        } catch (error) {
        res.status(400).json({ error: error.message });
        }
    },
    createPayment: async (req, res) => {
        try {
        const newPayment = await PolicyPaymentModel.createPayment(req.body);
        res.status(201).json(newPayment);
        } catch (error) {
        res.status(400).json({ error: error.message });
        }
    },
    };

module.exports = policyController;