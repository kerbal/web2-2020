require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import models from './models';
import expressValidator from 'express-validator';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth';
import accountRoute from './routes/account';
import adminAuthRoute from './routes/auth.admin';
import transactionRoute from './routes/transaction';

import Redis from './services/redis';

import verifyCustomer from './middleware/verifyUser'

const app = express();
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());

//route
app.use('/api/auth', authRoute);
app.use('/api/transaction', verifyCustomer, transactionRoute);
app.use('/api', accountRoute);
app.use('/api/admin/auth', adminAuthRoute);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      error: 'Unauthenticated',
    });
  }
  res.status(500).send({
    message: 'Something went wrong!',
  });
});

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  try {
    models.sequelize.authenticate();
    console.log('Database connected!');
    await Redis.ping();
    console.log('Redis connected!');
    console.log(`Server is listening on port ${port}!`);
  }
  catch (error) {
    console.log('Failed to start server!');
    console.log(error);
  }
});
