const { google } = require("googleapis");
const File = require("../schemas/file");
const path = require("path");
const fs = require('fs');
const readline = require("readline");
const MailComposer = require('nodemailer/lib/mail-composer');
require("dotenv").config();

const appDir = path.dirname(require.main.filename);
const SCOPES = ['https://mail.google.com/', 'https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = process.env.GOOGLE_PATH;
let oAuth2Client;

fs.readFile('./keys/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    let credentials = JSON.parse(content);
    let {client_id, client_secret, redirect_uris} = credentials.web;
    oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    console.log("Credentials Loaded");
    fs.readFile(TOKEN_PATH, (err, token) => {
        if(err) return getNewToken();
        oAuth2Client.setCredentials(JSON.parse(token));
        console.log("Google Tokens Loaded");
    });
});

async function uploadToDrive(file, options){
    let drive = new google.drive({version: 'v3', auth: oAuth2Client});
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
                uploader: options.userID || 'none',
                fileID: res.data.id,
                fileName: name,
                originalName: file.originalname,
                mimeType: file.mimetype,
                webinarID: options.webinarID,
                uploadDate: new Date()
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

async function downloadFile(req, res){
    let fileID = req.query.fileID;
    let file = await File.findById(req.query.fileDocumentID);
    const drive = new google.drive({version: 'v3', auth: oAuth2Client});
    let f = await drive.files.get({ fileId: fileID, alt: 'media'}, {responseType: 'stream'});
    res.attachment(file.originalName);
    f.data.on('end', () => res.end());
    f.data.on('error', (err) => console.error(err));
    f.data.pipe(res);
}

async function createFolder(folderName){
    let drive = new google.drive({version: 'v3', auth: oAuth2Client});
    let fileMetadata = {
        'name': folderName,
        'mimeType': 'application/vnd.google-apps.folder',
        parents: ["17wlgDo6fYqQN3_fSjBSHZwo5Cv-KNQbC"]
      };
      let res = await drive.files.create({
        resource: fileMetadata,
        fields: 'id'
      });
      return res.data.id;
}

async function getContentLink(fileId){
    let drive = new google.drive({version: 'v3', auth: oAuth2Client});
    let f = await drive.files.get({ fileId, fields:"webContentLink"});
    console.log(f.data);
    return "";
}

function getNewToken() {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            console.log("Google Tokens Loaded");
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
        });
    });
}
  
async function sendEmail({to, message = "Default Message", subject = "Default Subject"}){
    let messageBody = {
        to,
        from: "didasko.backend@gmail.com",
        subject,
        text: message,
    };
    let mail = new MailComposer(messageBody);
    try{
        let rawData = await mail.compile().build();
        let requestBody = { raw: rawData.toString('base64')};
        const gmail = google.gmail({version: 'v1', auth: oAuth2Client});
        let { data } = await gmail.users.messages.send({ userId: 'me', requestBody });
        return data;
    }
    catch (e){
        throw e;
    }
};

module.exports = {uploadToDrive, getContentLink, sendEmail, createFolder, downloadFile};