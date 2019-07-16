const Post = require('../models/post.model')

module.exports.like= async (req, res, next)=>{
    try {
        const post = await Post.findById(req.params.postId);
        const users = post.interactive.users;
        const result = [];
        users.map(user=>{
            if(user.email===req.user.email){
                result.push(user)
            }
        });
        if(!result.length){
            users.push(req.user);
            post.interactive.like = post.interactive.like + 1;
        }else{
            res.status(404).json('You interacted')
        }
        await post.save()
        res.json(post)
    } catch (err) {
        console.log(err)
    }
};
module.exports.love= async (req, res, next)=>{
    try {
        const post = await Post.findById(req.params.postId);
        const users = post.interactive.users;
        const result = [];
        users.map(user=>{
            if(user.email===req.user.email){
                result.push(user)
            }
        });
        if(!result.length){
            users.push(req.user);
            post.interactive.love = post.interactive.love + 1;
        }else{
            res.status(404).json('You interacted')
        }
        await post.save()
        res.json(post)
    } catch (err) {
        console.log(err)
    }
};
module.exports.dislike= async (req, res, next)=>{
    try {
        const post = await Post.findById(req.params.postId);
        const users = post.interactive.users;
        const result = [];
        users.map(user=>{
            if(user.email===req.user.email){
                result.push(user)
            }
        });
        if(!result.length){
            users.push(req.user);
            post.interactive.dislike = post.interactive.dislike + 1;
        }else{
            res.status(404).json('You interacted')
        }
        await post.save()
        res.json(post)
    } catch (err) {
        console.log(err)
    }
};
