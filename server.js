"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'your_username', // Replace with your MySQL username
    password: 'your_password', // Replace with your MySQL password
    database: 'your_database_name' // Ensure this database exists
});
connection.connect(error => {
    if (error) {
        console.error('An error occurred while connecting to the database:', error);
        return;
    }
    console.log('Successfully connected to the database.');
});
app.post('/signup', (req, res) => {
    const { name, phoneNumber, email, address } = req.body;
    // Basic validation
    if (!name || !phoneNumber || !email || !address) {
        return res.status(400).send('Missing fields in request body');
    }
    const sql = 'INSERT INTO users (name, phone_number, email, address) VALUES (?, ?, ?, ?)';
    connection.query(sql, [name, phoneNumber, email, address], (error, results) => {
        if (error) {
            console.error('Error inserting data into database:', error);
            return res.status(500).send('Error in saving to database');
        }
        res.status(200).send('Signup successful');
    });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
