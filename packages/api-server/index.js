require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import models from './models';
import expressValidator from 'express-validator';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth';
import accountRoute from './routes/account';

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

models.sequelize.authenticate().then(() => {
  console.log('Database connected!');
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is up!');
  });
});
