const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MsgSchema = Schema({
    creatAt:{
        type: Date,
        default: Date.now
    },
    vs: {
        type: Array,
        require: true
    },
    msg:{
        type: String,
        require: true
    }
});

const Msg = mongoose.model('Msg', MsgSchema);

module.exports = Msg
