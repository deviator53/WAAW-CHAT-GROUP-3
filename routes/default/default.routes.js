const express = require('express');
const router = express.Router();
const {home, 
    postHome, 
    resetPassword, 
    postResetPassword, 
    poster,
    deletePost,
    postReply,
    postLike,
    commentLike} = require('../../controllers/default/default.controller');

const {isLoggedIn} = require('../../config/authorizations');


router.route('/')
    .get(home)
    .post(isLoggedIn, postHome);

router.route('/reset-password')
    .get(isLoggedIn, resetPassword)
    .post(isLoggedIn, postResetPassword);


router.route('/:postId')
      .post(isLoggedIn, postReply);

router.route('/delete-post/:postId')
      .get(isLoggedIn, deletePost);

router.route('/like-post/:postId')
      .post(isLoggedIn, postLike);

router.route('/like-comment/:commentId')
      .post(isLoggedIn, commentLike);

router.route('/my-post')
      .get(isLoggedIn, poster);

router.route('/search-post')
      .get(isLoggedIn)
      .post(isLoggedIn);


module.exports = router;