const express = require('express');
const userRouter = require('./routes/userRouter');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('This is the Home Page of the Ride A Bike Server');
});

app.use('/users', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).send({
    stats: 'failed',
    message: `The route ${req.originalUrl} that you are trying to access doesn't exist.`
  })
});

module.exports = app;
