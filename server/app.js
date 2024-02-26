const express = require('express');
const usersRoutes = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Middleware to log the request body
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});

app.use('/api', usersRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
