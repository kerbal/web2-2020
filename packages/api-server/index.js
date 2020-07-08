import express from 'express';
import bodyParser from 'body-parser';
import models from './models';

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.log(err.message);
});

app.listen(process.env.PORT || 3000, async () => {
  models.sequelize.authenticate().then(() => {
    console.log('Database connected!');
    console.log('Server is up!');
  });
});