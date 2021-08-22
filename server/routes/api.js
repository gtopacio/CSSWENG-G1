const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const { validationResult } = require('express-validator');
const upload = multer({ dest: './uploads' });

const User = require("../schemas/user");
const authLib = require("../lib/authentication");
const googleLib = require("../lib/google_api");
const validations = require('../lib/validators');

const router = express.Router();

router.post("/login", validations.loginValidator, async(req, res) => {

    let err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).send({
            success: false,
            errors: err.array().reduce((acc, x) => {acc[x.param] = x.msg; return acc;}, {})
        });  
    }

    try{
        let {userName, password} = req.body;
        let foundUser = await User.findOne({userName}).lean();
        if(!foundUser){
            return res.send({success:false, errors: ["Wrong Username or Password"]});
        }

        if(!foundUser.verified){
            return res.send({success:false, errors: ["Account not yet verified"]});
        }

        let same = await bcrypt.compare(password, foundUser.password);
        if(same){
            req.session.user = foundUser;
            req.session.save();
            
            let user = authLib.trimUserInfo(foundUser);
            return res.send({success: true, user});
        }

        res.send({success:false, errors: ["Wrong Username or Password"]});
    }
    catch(e){
        res.send({success:false, errors: [e.message]});
    }
});

router.post("/signup", upload.single('profilePicture'), validations.signupValidator, validations.signupProfilePicture, async(req, res) => {

    try{
        let saltRound = 10;
        req.body.password = await bcrypt.hash(req.body.password, saltRound);
        let info = req.body;
        info.admin = false;
        info.verified = false;
        let newUser = new User(info);
        let fileID = await googleLib.uploadToDrive(req.file, {
            parent: ['1e23zn0qdTWIEJJYV0yCv9O-XKpi17OKs'],
            userID: newUser._id
        });
        newUser.profilePicture = fileID;
        newUser = await newUser.save();
        let verificationLink = authLib.generateVerificationURL(newUser);
        let messageData = {
            to: req.body.email,
            message: `Hello this is the link for your email verification\n\n${verificationLink}`,
            subject: "Didasko Email Verification"
        }
        googleLib.sendEmail(messageData);
        return res.send({
            success: true
        });
    }
    catch(e){
        console.error(e);
        res.sendStatus(500).send({success:false, errors: [e.message]});
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy();
    res.send({success:true});
});

router.get("/refresh", (req, res) => {
    if(!req.session.user){
        return res.status(403).send({success:false});
    }
    res.send({success: true, user: authLib.trimUserInfo(req.session.user)});
});

router.post('/verify', validations.verificationValidator, async(req, res) => {
    let err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).send({
            success: false,
            errors: err.array.map(x => x.message)
        });
    }
    try{
        await authLib.verifyUser(req.body.uid);
        res.send({
            success:true
        });
    }
    catch(e){
        res.status(400).send({
            success: false,
            errors: [e.message]
        });
    }
});

router.get("/reflect", (req, res) => {
    res.send(req.query);
});

module.exports = router;