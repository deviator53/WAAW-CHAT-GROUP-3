const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    email: {
        type:String
    },
    
    username: {
        type: String
    },
    secretToken:{
        type: String
    },
    verified:{
        type: Boolean,
        default: false
    },
    password: {
        type: String
    },

    posts: [{
        type: mongoose.Types.ObjectId,
        ref: 'post'
    }],

    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'like'
    }],

    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'comment'
    }]
},{timestamps:true});

const User = mongoose.model('user', userSchema);

module.exports = User;