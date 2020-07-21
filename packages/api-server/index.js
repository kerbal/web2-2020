require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import models from './models';
import expressValidator from 'express-validator';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth';
import accountRoute from './routes/account';
import userRoute from './routes/user';

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
app.use('/api', accountRoute);
app.use('/api/user', verifyCustomer, userRoute);

//catch 404 error
app.use((req, res, next)=> {
  res.status(404).json({
    error: 'NotFound',
  });
});

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

app.listen(process.env.PORT || 3000, async () => {
  models.sequelize.authenticate().then(() => {
    console.log('Database connected!');
    console.log('Server is up!');
  });
});
