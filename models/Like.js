const mongoose = require('mongoose');
const {Schema} = mongoose;

const likeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    like: {
        type: String,
    },

    PostId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    
},{timestamps:true});

const Like = mongoose.model('like', likeSchema);

module.exports = Like;