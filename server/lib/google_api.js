const { google } = require("googleapis");
const File = require("../schemas/file");
const path = require("path");
const fs = require('fs');
require("dotenv").config();

const appDir = path.dirname(require.main.filename);
const auth = new google.auth.GoogleAuth({
    keyFile: path.join(appDir, process.env.GOOGLE_PATH),
    scopes: ['https://www.googleapis.com/auth/drive']
});

async function uploadToDrive(file, options){
    let drive = new google.drive({version: 'v3', auth});
    let name = options.userID || 'none';
    let uploadPath = path.join(appDir, "uploads", file.filename);

    let resource = { 
        name , parents: options.parent
    };

    let media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(uploadPath)
    };
    try{
        let res = await drive.files.create({
            resource, media, fields: 'id'
        });
    
        //Create DB Document
        if(res.status === 200) {
            let newFile = new File({
                uploader: options.userID,
                fileID: res.data.id,
                fileName: name,
                mimeType: file.mimetype
            });
            await newFile.save();
        }
        fs.unlink(uploadPath, () => {return;});
        return res.data.id;
    }
    catch(e){
        throw e;
    }
}

async function getContentLink(fileId){
    let drive = new google.drive({version: 'v3', auth});
    let f = await drive.files.get({ fileId, fields:"webContentLink"});
    console.log(f.data);
    return "";
}



module.exports = {uploadToDrive, getContentLink,};