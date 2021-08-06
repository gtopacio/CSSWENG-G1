const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
    "userName": {type: String, required:true},
    "email": {type: String, required:true},
    "issued": {type: Date, default: Date.now, required: true},
    "expires": {type: Date, default: Date.now, required: true},
    "uid": {type: String, required: true}
});

module.exports = mongoose.model('verifications', verificationSchema);