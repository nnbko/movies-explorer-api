/* eslint-disable eol-last */
const Movie = require('../models/movie');
const ErrorNotFound = require('../constants/ErorrNotFound');
const ErrorBadRequest = require('../constants/ErrorBadRequest');
const ErrorForbidden = require('../constants/ErrorForbidden');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .then((movie) => { res.send(movie); })
    .catch(next);
};
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        next(new ErrorNotFound('Карточка не найдена'));
        return;
      }
      if (movie.owner.toString() !== userId) {
        next(new ErrorForbidden('Вы не можете удалить эту карточку'));
        return;
      }
      Movie.findByIdAndDelete(movieId)
        .then(() => {
          res.status(200).send(movie);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Неккорктный ID'));
        return;
      }
      next(err);
    });
};
