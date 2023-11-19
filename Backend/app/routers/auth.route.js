const express = require('express');
const authController = require('../controller/auth.controller')

const router = express.Router();

router.route('/register')
    .post(authController.register);

router.route('/login', )
    .post(authController.login);

router.route('/logout')
    .get(authController.logout)

router.route('/user')
    .get(authController.user)
module.exports = router;