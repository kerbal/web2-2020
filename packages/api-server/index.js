require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import models from './models';
import expressValidator from 'express-validator';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth';

const app = express();
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());

//route
app.use('/api/auth', authRoute);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      error: 'Unauthenticated',
    });
  }

});

app.listen(process.env.PORT || 3000, async () => {
  models.sequelize.authenticate().then(() => {
    console.log('Database connected!');
    console.log('Server is up!');
  });
});
