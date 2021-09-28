const mongoose = require('mongoose');
const {Schema} = mongoose;

const likeSchema = new Schema({
    
    
},{timestamps:true});

const Like = mongoose.model('like', likeSchema);

module.exports = Like;