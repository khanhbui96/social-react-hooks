const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = Schema({
    user: {
        type: Object,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    interactive:{
        users: Array,
        like: Number,
        love: Number,
        dislike: Number
    }
})

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;