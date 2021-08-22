const mongoose = require("mongoose");

const enrollmentVerificationSchema = new mongoose.Schema({
    "webinarID": {type: String, required: true},
    "webinarName": {type: String, required: true},
    "userID": {type: String, require: true},
    "userName": {type: String, required:true},
    "email": {type: String, required:true},
    "issued": {type: Date, default: Date.now, required: true},
    "uid": {type: String, required: true},
    "accepted": {type: Boolean, required: true, default: false},
    "acceptedDate": {type: Date}
});

module.exports = mongoose.model('enrollmentVerifications', enrollmentVerificationSchema);