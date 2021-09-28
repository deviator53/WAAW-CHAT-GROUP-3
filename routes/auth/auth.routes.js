const express = require('express');
const router = express.Router();

const {
    register, 
    login, 
    postRegister, 
    postLogin,
    verify,
    postVerify,
    logout,
    forgotPassword,
    postForgotPassword} = require('../../controllers/auth/auth.controller');


router.route('/register')
    .get(register)
    .post(postRegister);

router.route('/login')
    .get(login)
    .post(postLogin);

router.route('/verify-token')
    .get(verify)
    .post(postVerify);

router.route('/logout')
    .get(logout);

router.route('/forgot-Password')
    .get(forgotPassword)
    .post(postForgotPassword);

module.exports = router;