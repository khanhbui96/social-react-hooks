const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    following: Array,
    followers: Array
});

const User = mongoose.model("User", UserSchema);
module.exports = User;