const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema({
    "name": {type: String, required:true},
    "teachers": {type: Object, default: {}},
    "students": {type: Object, default: {}},
    "lastUpdate": {type: Date, default: Date.now, required: true},
    "creationDate": {type: Date, default: Date.now, required: true},
    "bannerLink": {type: String},
    "bannerID": {type: String},
    "price": {type: Number, default: 0}
});

module.exports = mongoose.model('webinars', webinarSchema);