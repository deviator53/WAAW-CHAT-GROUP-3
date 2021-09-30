const express = require('express');
const router = express.Router();
const {home, 
    postHome, 
    resetPassword, 
    postResetPassword, 
    poster,
    postReply,
    postLike} = require('../../controllers/default/default.controller');

const {isLoggedIn} = require('../../config/authorizations');


router.route('/')
    .get(home)
    .post(isLoggedIn, postHome);

router.route('/reset-password')
    .get(isLoggedIn, resetPassword)
    .post(isLoggedIn, postResetPassword);


router.route('/:postId')
      .post(isLoggedIn, postReply);

router.route('/:id')
      .put(isLoggedIn, postLike);

router.route('/my-post')
      .get(isLoggedIn, poster)


module.exports = router;