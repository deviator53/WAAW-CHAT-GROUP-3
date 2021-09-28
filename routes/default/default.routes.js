const express = require('express');
const router = express.Router();
const {home, postReply, postLike, postHome, poster, resetPassword, postResetPassword} = require('../../controllers/default/default.controller');
const {isLoggedIn} = require('../../config/authorizations');

// router.get('/index', home);
router.route('/')
    .get(home)
    .post(isLoggedIn, postHome);

router.route('/:postId')
      .post(isLoggedIn, postReply);

router.route('/add-like/:id')
      .post(isLoggedIn, postLike);

router.route('/reset-password')
    .get(isLoggedIn ,resetPassword)
    .post(isLoggedIn ,postResetPassword);

router.route('/my-post')
      .get(isLoggedIn, poster)


module.exports = router;