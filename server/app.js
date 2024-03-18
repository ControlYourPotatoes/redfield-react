const express = require('express');
const cors = require('cors');
const path = require('path');
const usersRoutes = require('./routes/users');
const createDatabasePool = require('./config/db'); // Adjust the path as necessary
require('dotenv').config();

const app = express();


const corsOption = {
    origin: '*', //Switched for local, test in production needed here
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));


app.use(express.json());

// Simplified logging middleware using console
app.use((req, res, next) => {
  console.log('Received request', { url: req.url, method: req.method, body: req.body });
  next();
});

// API routes
app.use('/api', usersRoutes);
// After API routes, serve static files from the React build
app.use(express.static(path.join(__dirname, '..', 'dist')));

// SPA support: redirect all non-API requests to the React index.html
app.get('*', (req, res) => {
  if (!req.url.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }
});


// Initialize the database pool and then start the server
createDatabasePool().then(pool => {
  console.log("Database pool created successfully.");
  app.locals.pool = pool;
  
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch(error => {
  console.error('Failed to initialize the database pool:', error);
  process.exit(1);
});
