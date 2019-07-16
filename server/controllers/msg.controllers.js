const Msg = require('../models/msg.model')

module.exports.giveMsg = (req, res)=>{
    const msg = new Msg({
        vs: [req.body.id, req.user._id.toString()],
        msg: req.body.msg
    });
    msg.save()
        .then(msg=>res.json(msg))
        .catch(err=>console.log(err))    
};
module.exports.getAllMsgs = (req, res)=>{
    Msg.find()
        .then(msgs=>res.json(msgs))
        .catch(err=>console.log(err))
};
module.exports.getMsgsById = (req, res)=>{
    Msg.find()
        .then(msgs=>{
            const result = msgs.filter(e=>{
                return e.vs.indexOf(req.user._id.toString())!==-1&&e.vs.indexOf(req.params.id)!==-1
            });
            res.json(result)
        })
        .catch(err=>console.log(err))
}