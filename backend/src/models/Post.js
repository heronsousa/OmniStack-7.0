const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: Text,
    hashtags: Schema,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);