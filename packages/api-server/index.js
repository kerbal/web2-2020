require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressValidator from 'express-validator';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth';
import accountRoute from './routes/account';
import userRoute from './routes/user';
import adminAuthRoute from './routes/auth.admin';
import transactionRoute from './routes/transaction';
import adminTransactionRoute from './routes/transaction.admin';

import models from './models';
import verifyCustomer from './middleware/verifyUser';
import verifyAdmin from './middleware/verifyAdmin';
import verifyUser from './middleware/verifyUser';

import './jobs';
import Redis from './services/redis';

const app = express();
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(cors());
//route
app.use('/api/auth', authRoute);
app.use('/api/transaction', verifyCustomer, transactionRoute);
app.use('/api', accountRoute);
app.use('/api/user', verifyCustomer, userRoute);
app.use('/api/admin/auth', adminAuthRoute);
app.use('/api/admin/transaction', verifyUser, verifyAdmin, adminTransactionRoute);

app.use('*', (req, res)=> {
  res.status(404).json({
    error: 'NotFound',
  });
});
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Unauthorized', message: err.message });
  }
  console.log(err);
  res.status(500).json({
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
