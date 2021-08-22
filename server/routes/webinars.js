const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Webinar = require("../schemas/webinar");
const EnrollmentVerification = require("../schemas/enrollment_verification");
const { checkSession } = require('../lib/authentication');

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

module.exports = router;