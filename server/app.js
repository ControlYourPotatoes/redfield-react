const express = require('express');
const usersRoutes = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', usersRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
