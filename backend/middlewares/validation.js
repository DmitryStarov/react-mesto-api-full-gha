const { celebrate, Joi } = require('celebrate');
const { REG_URL, REG_ID } = require('../utils/constants');

const validatePostUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REG_URL),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const validateGetUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().regex(REG_ID),
  }),
});

const validatePathUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});
const validatePathAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(REG_URL),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validatePostCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(REG_URL),
  }),
});

const validateUpdateCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().regex(REG_ID),
  }),
});

module.exports = {
  validatePostUser,
  validateGetUser,
  validatePathUser,
  validatePathAvatar,
  validateLogin,
  validatePostCard,
  validateUpdateCard,
};
