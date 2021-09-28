const Post = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const bcrypt = require('bcryptjs');
const {post} = require('../../routes/auth/auth.routes');


module.exports = {
    home: async (req,res) => {
        let userExist = req.user;
        let postComment = req.comments;
        let userPosts = await Post.find({}).sort({_id: -1}).populate('user')
        .populate({
            path: 'comments',
            models: 'Comment',
            populate: {
                path: 'user',
                models: 'User'
            }
        });
        console.log(postComment);
        res.render('default/index', {posts: userPosts, user: userExist, comments: postComment})
    },

    resetPassword: async (req, res) => {
        res.render('default/reset-password', {pageTitle: 'Password Reset'})
    },

    postHome: async (req, res) => {
        let loggedUser = req.user;
        let {value} = req.body;

        if (!value) {
            req.flash('error-message', 'Please enter a post');
            return res.redirect('back');
        }

        let newPost = new Post ({
            user: loggedUser._id,
            posts: value,
        });

        newPost.save()
        .then(content => {
            console.log(content);
            req.flash('success-message', 'Post sent');
            res.redirect('/');
        })
        .catch(error => {
            if(error){
                req.flash('error-message', error.posts);
                res.redirect('back');
            }
        });
    },

    postReply: async (req, res) => {
        let loggedInUser = req.user;
        let enterPost = req.params.postId;
        let {newcomment} = req.body;
        let postExist = await Post.findOne({_id: enterPost});
       
        console.log(newcomment);

        if (!newcomment) {
            req.flash('error-message', 'Please enter a comment');
            return res.redirect('back');
        }

        let newComment = new Comment ({
            comment: newcomment,
            user: loggedInUser._id,
        });

        await newComment.save();

        if (!newComment){
            req.flash('error-message', 'Unable to post comment');
            return res.redirect('back')
        }

        postExist.comments.push(newComment._id);
        await postExist.save();

        console.log(postExist.comments);
        req.flash('success-message', 'Comment success');
        return res.redirect('back');

    },
    poster: async (req, res) => {
        let userExist = req.user;
        let userPosts = await Post.find({user: userExist._id})
            .sort({_id: -1})
            .populate({
                path: "comments",
                models: "Comment",
                populate:{
                    path: "user",
                    models: "User"

                }})
            .populate('user');

        
        console.log("::::::: ", userPosts)
        res.render('default/my-post', {
            posts: userPosts
        });
    },
    postResetPassword: async (req, res, done) => {
        let {
            oldpassword,
            newpassword,
            confirmnewpassword
        }= req.body;
        if(oldpassword.length < 6){
            req.flash('error-message', 'Password must be atleast 6 characters.');
            return res.redirect('back');
        }
        if (newpassword.length < 6){
            req.flash('error-message', 'Password must be atleast 6 characters');
            return res.redirect('back');
        }
        if (newpassword != confirmnewpassword) {
            req.flash('error-message', 'Passwords do not match');
            return res.redirect('back');
        }

        let user = await User.findOne(req.user);
        const compare = await bcrypt.compare(oldpassword, user.password);
        if (!compare) {
            req.flash('error-message', 'Old password is incorrect');
            return res.redirect('back');
        }
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(newpassword, salt);
        user.password = hashedpassword;
        await user.save();
        req.flash('success-message', 'Password reset was successful');
        return res.redirect('/');
    },
    postLike: async (req, res, next)=>{
        let { id } = req.params;
        if (!req.user) {
            req.flash('error-message', 'You have to be logged in to perform this action.')
            return res.redirect('/auth/login')
        }
        Post.findById(id, async function(err, post) {

            for await (let like of post.likedBy) {
                let test = like == req.user.id;
                if (test) {
                    req.flash("error-message", "Not allowed! You can only like a post once.");
                    return res.redirect("back");
                }

            }
            await post.likedBy.push(req.user.id);
            await post.save();
            return res.redirect("back")

        });

    }

}