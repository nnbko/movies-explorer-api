/* eslint-disable eol-last */
const router = require('express').Router();
const { validateUpadteUser, validateUserId } = require('../utils/validation');
const {
  getUsers,
  updateUserData,
} = require('../controllers/users');

router.get('/me', validateUserId, getUsers);
router.patch('/me', validateUpadteUser, updateUserData);

module.exports = router;