const mongoose = require('mongoose');
const {Schema} = mongoose;
const ppostSchema = new Schema({
    post:{
        type: String
    }
},{timestamps:true});

const PPost = mongoose.model('post', ppostSchema);

module.exports = PPost;