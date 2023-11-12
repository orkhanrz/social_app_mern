const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const userMiddleware = require('../middlewares/user');

router.post('/login', userMiddleware.loginValidate, authController.login);

router.post('/signup', userMiddleware.signUpValidate, authController.signup);

module.exports = router;