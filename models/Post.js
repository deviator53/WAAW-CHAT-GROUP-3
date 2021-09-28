const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    
    user: {
        type: mongoose.Types.ObjectId,
        ref:'user'
    },
    
    title: {
        type:String
    },

    posts:{
        type: String
    },

    message: {
        type: String
    },

    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'comment'
    }],
    
    likedBy: [{
        type: mongoose.Types.ObjectId,
        ref: "user"
    }],

    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'like'
    }]
},{timestamps:true});

const Post = mongoose.model('post', postSchema);

module.exports = Post;