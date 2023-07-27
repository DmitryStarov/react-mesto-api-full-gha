const router = require('express').Router();
const {
  getCards,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');
const { validatePostCard, validateUpdateCard } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', validatePostCard, postCard);
router.delete('/:cardId', validateUpdateCard, deleteCard);
router.put('/:cardId/likes', validateUpdateCard, putLike);
router.delete('/:cardId/likes', validateUpdateCard, deleteLike);
module.exports = router;
