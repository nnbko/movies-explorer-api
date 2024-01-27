const { celebrate, Joi } = require('celebrate');

const regex = /^https?:\/\/(www\.)?[a-zA-Z0-9]+([.|-]{1}[a-zA-Z0-9]+)*\.[a-zA-Z0-9]+(\/[0-9a-zA-Z\-._~:/?#[\]@!$&'()*+,;=]*#?)?$/;

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});


const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const validateUpadteUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regex),
    trailerLink: Joi.string().required().pattern(regex),
    thumbnail: Joi.string().required().pattern(regex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUserId,
  validateUpadteUser,
  validateCreateCard,
  validateCardId,
};
