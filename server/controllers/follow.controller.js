const User = require('../models/user.model');

module.exports.follow= async (req, res, next) =>{
    try {
        if(req.params.themId === req.user._id.toString()){
            res.status(404).json('You can not follow yourself!')
        }else{
            const them = await User.findById(req.params.themId);
            them.followers.push(req.user._id.toString());
            them.save();
            const me = await User.findById(req.user._id)
            me.following.push(them._id.toString());
            me.save();        
            res.json({them, me})
        }
    } catch (err) {
        console.log(err)
    }
};
module.exports.unFollow= async (req, res, next)=>{
    try {
        if(req.params.themId === req.user._id.toString()){
            res.status(404).json('You can not unfollow yourself !')
        }else{
            const them = await User.findById(req.params.themId);
            const themFollowers = them.followers.filter(item=>{
                return item !== req.user._id.toString()
            });
            them.followers = themFollowers;
            them.save();
            const me = await User.findById(req.user._id)
            const meFollowing = me.following.filter(item=>{
                return item !== them._id.toString()
            })
            me.following = meFollowing;
            me.save();        
            res.json({them, me})
        }
    } catch (err) {
        console.log(err)
    }
};