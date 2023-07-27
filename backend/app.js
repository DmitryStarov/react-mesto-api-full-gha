const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const { routeUsers, routeCards } = require('./routes/index');
const { postUser, login } = require('./controllers/users');
const { NOT_FOUND_STATUS, INTERNAL_SERVER_STATUS, SERVER_ERROR_MESSAGE } = require('./utils/constants');
const { validatePostUser, validateLogin } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const URL = 'mongodb://127.0.0.1:27017/mestodb';
const { PORT = 3000 } = process.env;
mongoose.connect(URL);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/signin', validateLogin, login);
app.use('/signup', validatePostUser, postUser);

app.use(auth);
app.use('/users', routeUsers);
app.use('/cards', routeCards);
app.use('*', (req, res) => {
  res.status(NOT_FOUND_STATUS).send({ message: 'Страница не найдена' });
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_STATUS, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_STATUS
        ? SERVER_ERROR_MESSAGE
        : message,
    });

  next();
});

app.listen(PORT);
