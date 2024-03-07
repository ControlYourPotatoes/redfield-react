const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users');
const createDatabasePool = require('./config/db'); // Adjust the path as necessary
require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.json());

// Simplified logging middleware using console
app.use((req, res, next) => {
  console.log('Received request', { url: req.url, method: req.method, body: req.body });
  next();
});

// Initialize the database pool and then start the server
createDatabasePool().then(pool => {
  // Make the pool accessible to your route handlers, if needed
  console.log("Database pool created successfully.");
  app.locals.pool = pool;
  console.log('Is pool available in app.locals?', Boolean(app.locals.pool));
  
  app.use('/api', usersRoutes);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch(error => {
  console.error('Failed to initialize the database pool:', error);
  // Consider exiting the process if the database is essential to your application
  process.exit(1);
});
