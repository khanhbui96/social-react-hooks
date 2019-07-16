const Post = require('../models/post.model');
const mongoose = require('mongoose')

module.exports.add = async (req, res)=>{
    const {text} = req.body;
    const {_id, login}= req.user
    const newPost = new Post({
        user: {
            _id,
            login
        },
        text,
        
        interactive: {
            status: [],
            like: 0,
            love: 0,
            dislike: 0
        }
    })
    newPost.save()
        .then(newPost=>res.json(newPost))
        .catch(err=>console.log(err))
};
module.exports.getPosts = (req, res)=> {
    Post.find()
        .sort({createAt: -1})
        .then(posts=>res.json(posts))
        .catch(err=>console.log(err))
};
module.exports.getPostsById = (req, res)=>{
    Post.find({'user._id': mongoose.Types.ObjectId(req.params.profileId)})
        .sort({createAt: -1})
        .then(posts=>res.json(posts))
        .catch(err=>console.log(err))
}