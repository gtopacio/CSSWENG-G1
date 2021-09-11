const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    uploader: {type:String, required:true},
    fileID: {type:String, required:true},
    fileName: {type:String, required:true},
    mimeType: {type:String, required:true},
    webinarID: {type: String},
    uploadDate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('files', fileSchema);