require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import models from './models';
import expressValidator from 'express-validator';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth';
import accountRoute from './routes/account';
import transactionRoute from './routes/transaction';
import Redis from './services/redis';

import verifyCustomer from './middleware/verifyUser';

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
//catch 404 error
app.use('*', (req, res)=> {
  res.status(404).send({
    error: 'NotFound',
  });
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  console.log(err);
  res.status(500).send({
    error: 'Something went wrong!',
  });
  next();
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
