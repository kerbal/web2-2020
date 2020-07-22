require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import displayRoutes from 'express-routemap';
import expressValidator from 'express-validator';
import cookieParser from 'cookie-parser';

import models from './models';
import router from './routes/router';
import Redis from './services/redis';

const app = express();
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
//route
app.use(router);

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
    displayRoutes(app);
  }
  catch (error) {
    console.log('Failed to start server!');
    console.log(error);
  }
});
