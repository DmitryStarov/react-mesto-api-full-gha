/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const {
  INTERNAL_SERVER_STATUS,
  SERVER_ERROR_MESSAGE,
  INVALID_ADD_USER_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INVALID_UPDATE_USER_MESSAGE,
  INVALID_UPDATE_AVATAR_MESSAGE,
  CONFLICT_EMAIL_MESSAGE,
  SECRET_KEY,
  OK_STATUS,
} = require('../utils/constants');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const ConflictRequestError = require('../errors/ConflictRequestError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => res.status(INTERNAL_SERVER_STATUS).send({ message: SERVER_ERROR_MESSAGE }));
};
module.exports.getUserInfo = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound(USER_NOT_FOUND_MESSAGE);
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequest(USER_NOT_FOUND_MESSAGE));
      }
      return next(err);
    });
};
module.exports.postUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const { _id } = user;
      res.send({
        email,
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictRequestError(CONFLICT_EMAIL_MESSAGE));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequest(INVALID_ADD_USER_MESSAGE));
      }
      return next(err);
    });
};
const updateUserData = (req, res, next, data, badRequestMessage) => {
  User
    .findByIdAndUpdate(req.user._id, data, { new: true, runValidators: true, upsert: false })
    .then((user) => {
      if (!user) {
        throw new BadRequest(badRequestMessage);
      }
      res.send({ user });
    })
    .catch(next);
};
module.exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;
  return updateUserData(req, res, next, { name, about }, INVALID_UPDATE_USER_MESSAGE);
};
module.exports.patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return updateUserData(req, res, next, { avatar }, INVALID_UPDATE_AVATAR_MESSAGE);
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.status(OK_STATUS).send({ token });
    })
    .catch(next);
};
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      console.log(req.user._id);
      if (!user) {
        BadRequest(USER_NOT_FOUND_MESSAGE);
      }
      res.send({ user });
    })
    .catch(next);
};
