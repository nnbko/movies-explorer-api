/* eslint-disable eol-last */
const router = require('express').Router();
const { validateUpadteUser } = require('../utils/validation');
const {
  getUser,
  updateUserData,
} = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', validateUpadteUser, updateUserData);

module.exports = router;