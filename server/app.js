const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users');
const winston = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');

const app = express();
app.use(cors());

const transports = [
  new winston.transports.Console(),
];

if (process.env.NODE_ENV === 'production') {
  transports.push(new LoggingWinston());
}


const logger = winston.createLogger({
  level: 'info', // Log only if info level or above
  transports: [
    new winston.transports.Console(),
    new LoggingWinston(),
  ],
});

const port = process.env.PORT || 3000;

app.use(express.json());

// Middleware to log the request body
app.use((req, res, next) => {
  logger.info('Received request', { body: req.body });
  next();
});

app.use('/api', usersRoutes);

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
