const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },

    comment: {
        type: String
    },
    
},{timestamps:true});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;