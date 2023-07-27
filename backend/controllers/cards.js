const mongoose = require('mongoose');
const Card = require('../models/cards');

const {
  CREATED_STATUS,
  INVALID_ADD_CARD_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  INVALID_LIKE_CARD_MESSAGE,
  INVALID_ID_CARD_MESSAGE,
  FORBIDDEN_DELETE_CARD_MESSAGE,
} = require('../utils/constants');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

module.exports.getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
};
module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(CREATED_STATUS).send({ card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequest(INVALID_ADD_CARD_MESSAGE));
      }
      return next(err);
    });
};
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card
    .findById(cardId)
    .populate(['owner', 'likes'])
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return next(new NotFound(CARD_NOT_FOUND_MESSAGE));
      }
      if (!card.owner.equals(req.user._id)) {
        return next(new Forbidden(FORBIDDEN_DELETE_CARD_MESSAGE));
      }
      Card.deleteOne(card)
        .then(() => {
          res.send({ card });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequest(CARD_NOT_FOUND_MESSAGE));
      }
      return next(err);
    });
};
const updateLike = (req, res, next, data) => {
  const { cardId } = req.params;
  Card
    .findByIdAndUpdate(
      cardId,
      data,
      { new: true },
    )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFound(INVALID_ID_CARD_MESSAGE);
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequest(INVALID_LIKE_CARD_MESSAGE));
      }
      return next(err);
    });
};
module.exports.putLike = (req, res, next) => {
  const newLike = { $addToSet: { likes: req.user._id } };
  return updateLike(req, res, next, newLike);
};
module.exports.deleteLike = (req, res, next) => {
  const removedLike = { $pull: { likes: req.user._id } };
  return updateLike(req, res, next, removedLike);
};
