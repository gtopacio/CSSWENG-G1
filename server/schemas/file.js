const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    uploader: {type:String, required:true},
    fileID: {type:String, required:true},
    fileName: {type:String, required:true},
    mimeType: {type:String, required:true}
});

module.exports = mongoose.model('files', fileSchema);