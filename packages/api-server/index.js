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

app.use((err, req, res) => {
  console.log(err);
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
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
