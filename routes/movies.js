/* eslint-disable eol-last */
const router = require('express').Router();
const { validateCreateCard, validateCardId } = require('../utils/validation');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');


router.get('/', getMovies);
router.post('/', validateCreateCard, createMovie);
router.delete('/:movieId', validateCardId, deleteMovie);

module.exports = router;