require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const { validateLogin, validateCreateUser } = require('./utils/validation');
const ErrorNotFound = require('./constants/ErorrNotFound');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { NODE_ENV, PORT, DB_ADDRESS } = process.env;

const { login, createUser } = require('./controllers/users');

const app = express();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000', 'https://nnbkodip.nomoredomainswork.ru'] }));
mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS : 'mongodb://127.0.0.1/bitfilmsdb');
app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use('*', (req, res, next) => {
  next(new ErrorNotFound('Тут ничего нет'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(NODE_ENV === 'production' ? PORT : 3001);
