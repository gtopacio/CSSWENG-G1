const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
    participants: {type:[String], required:true},
    lastUpdated: {type:Date, required: true},
    title: {type:String},
    numMessage: {type: Number, default: 0},
    picture: {type: String}
});

module.exports = mongoose.model('chatthread', threadSchema);