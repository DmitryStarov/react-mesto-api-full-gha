const OK_STATUS = 200;
const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
const UNAUTH_STATUS = 401;
const FORBIDDEN_STATUS = 403;
const NOT_FOUND_STATUS = 404;
const INTERNAL_SERVER_STATUS = 500;
const CONFLICT_STATUS = 409;

const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
const INVALID_ADD_USER_MESSAGE = 'Переданы некорректные данные при создании пользователя';
const USER_NOT_FOUND_MESSAGE = 'Пользователь по указанному _id не найден';
const INVALID_UPDATE_USER_MESSAGE = 'Переданы некорректные данные при обновлении профиля';
const INVALID_UPDATE_AVATAR_MESSAGE = 'Переданы некорректные данные при обновлении аватара';
const INVALID_ADD_CARD_MESSAGE = ' Переданы некорректные данные при создании карточки';
const CARD_NOT_FOUND_MESSAGE = 'Карточка с указанным _id не найдена';
const INVALID_LIKE_CARD_MESSAGE = 'Переданы некорректные данные для постановки/снятии лайка';
const INVALID_ID_CARD_MESSAGE = ' Передан несуществующий _id карточки';
const INVALID_EMAIL = 'Неверно указан email';
const INVALID_URL = 'Неверно указан URL';
const CONFLICT_EMAIL_MESSAGE = 'Этот email уже зарегестрирован';
const AUTH_ERR_MESSAGE = 'Необходимо авторизироваться';
const FORBIDDEN_DELETE_CARD_MESSAGE = 'Запрещено удалять чужую карточку';
const { SECRET_KEY } = process.env;
const REG_URL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const REG_ID = /^[0-9a-fA-F]{24}$/;
module.exports = {
  OK_STATUS,
  CREATED_STATUS,
  BAD_REQUEST_STATUS,
  UNAUTH_STATUS,
  FORBIDDEN_STATUS,
  NOT_FOUND_STATUS,
  CONFLICT_STATUS,
  INTERNAL_SERVER_STATUS,
  SERVER_ERROR_MESSAGE,
  INVALID_ADD_USER_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INVALID_UPDATE_USER_MESSAGE,
  INVALID_UPDATE_AVATAR_MESSAGE,
  INVALID_ADD_CARD_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  INVALID_LIKE_CARD_MESSAGE,
  INVALID_ID_CARD_MESSAGE,
  INVALID_EMAIL,
  INVALID_URL,
  CONFLICT_EMAIL_MESSAGE,
  AUTH_ERR_MESSAGE,
  FORBIDDEN_DELETE_CARD_MESSAGE,
  SECRET_KEY,
  REG_URL,
  REG_ID,
};
