const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    "firstName": {type: String, required:true},
    "lastName": {type: String, required:true},
    "userName": {type: String, required:true},
    "password": {type: String, required:true},
    "email": {type: String, required:true},
    "profilePicture": {type: String},
    "admin": {type: Boolean, required:true},
    "verified": {type: Boolean, required: true, default: false},
    "webinars": {type: Object},
    "webinarsTaught": {type: Object}
});

module.exports = mongoose.model('users', userSchema);