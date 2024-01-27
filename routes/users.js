/* eslint-disable eol-last */
const router = require('express').Router();
const { validateUpadteUser, validateUserId } = require('../utils/validation');
const {
  getUser,
  updateUserData,
} = require('../controllers/users');

router.get('/me', validateUserId, getUser);
router.patch('/me', validateUpadteUser, updateUserData);

module.exports = router;