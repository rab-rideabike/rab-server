const express = require('express');
const userRouter = require('./routes/userRouter');
const morgan = require('morgan');
const AppError = require('./utils/AppError');
const errorController = require('./controllers/errorController');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('This is the Home Page of the Ride A Bike Server');
});

app.use('/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`The route ${req.originalUrl} that you are trying to access doesn't exist.`, 404));
});

app.use(errorController);

module.exports = app;
