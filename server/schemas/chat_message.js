const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    threadID: {type: String, required: true},
    sender: {type: String, required: true},
    textMessage: {type: String, required: true},
    attachment: {type: Object},
    dateSent: {type: Date, required: true},
    index: {type: Number, required: true}
});

module.exports = mongoose.model('chatmessages', messageSchema);