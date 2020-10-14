const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');
router.post('/signup', UsersController.users_create_new_user);
router.post('/login', UsersController.users_login_user);
router.delete('/:userId', UsersController.users_delete);


module.exports = router;