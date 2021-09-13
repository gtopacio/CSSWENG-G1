const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Webinar = require("../schemas/webinar");
const EnrollmentVerification = require("../schemas/enrollment_verification");
const File = require("../schemas/file");
const { checkSession } = require('../lib/authentication');
const multer = require("multer");
const upload = multer({ dest: './uploads' });
const googleLib = require("../lib/google_api");

router.use(checkSession);

router.post("/enroll", async(req, res) => {
    let user = req.session.user;
    let webinar = await Webinar.findById(req.body.webinarID);

    if(!webinar || !user){
        return res.status(404).send(
            {
                success:false, errors: {webinarID: !webinar ? "Webinar not found" : null, 
                userID: !userID ? "User not found" : null
            }
        });
    }

    if(user._id !== req.body.userID){
        return res.status(403).send({
            success:false, 
            errors: {
                userID: !userID ? "Invalid User ID" : null
            }
        });
    }

    let uid = uuidv4();

    let verificationInfo = {
        uid,
        webinarID: req.body.webinarID,
        webinarName: webinar.name,
        userID: req.body.userID,
        userName: user.userName,
        email: user.email,
        issued: Date.now(),
        accepted: false
    };

    await new EnrollmentVerification(verificationInfo).save();

    res.send({success: true, requestID: uid});
});

router.get("/", async(req, res) => {

    if(req.query.webinarID){
        let webinar = await Webinar.findById(req.query.webinarID);
        return res.send({success:true, webinar});
    }

    res.send({success:false})
});

router.get("/files", async(req, res) => {
    if(req.query.webinarID){
        let files = await File.find({webinarID: req.query.webinarID});
        return res.send({success:true, files});
    }
    res.send({success:false})
});

router.post("/files", upload.single("file"), async(req, res) => {

    let mimeTypes = ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png'];
    let webinar = await Webinar.findById(req.body.webinarID, 'folderID');

    if(!webinar || !mimeTypes.includes(req.file.mimetype)){
        res.status(403).send({success:false, errors: {
            webinarID: !webinar ? "Webinar not found" : undefined,
            file: !mimeTypes.includes(req.file.mimetype) ? "Invalid file type" : undefined
        }});
        let uploadPath = path.join(appDir, "uploads", req.file.filename);
        fs.unlink(uploadPath, () => {return;});
        return;
    }

    await googleLib.uploadToDrive(req.file, {
        parent: [webinar.folderID],
        userID: req.session.user._id,
        webinarID: webinar._id
    });

    let files = await File.find({webinarID: webinar._id}).sort({uploadDate: 1});
    res.send({success: true, files});
});

router.get("/file", googleLib.downloadFile);

module.exports = router;