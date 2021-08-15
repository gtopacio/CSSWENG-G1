const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema({
    "name": {type: String, required:true},
    "teachers": {type: Object, required:true},
    "students": {type: Object, required:true},
    "lastUpdate": {type: Date, default: Date.now, required: true},
    "creationDate": {type: Date, default: Date.now, required: true},
    "bannerLink": {type: String},
    "bannerID": {type: String}
});

module.exports = mongoose.model('webinars', webinarSchema);