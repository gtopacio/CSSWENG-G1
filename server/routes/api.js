const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const {generateTokens, authenticateTokens, refreshToken, generateVerificationURL, verifyUser} = require("../lib/helpers");
const multer = require("multer");
const upload = multer({ dest: './uploads' });
const { uploadToDrive, sendEmail } = require("../lib/google_api");
const validations = require('../lib/validators');
const { validationResult } = require('express-validator');

const defaultCookieOptions = {
    maxAge: 31*24*60*60*100, 
    httpOnly: true, 
    secure: process.env.NODE_ENV == 'production',
    sameSite: true
};

require('dotenv').config();
const DB_URL = process.env.MONGO_URL;
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => console.log("MongoDB successfully connected"));

router.post("/login", validations.loginValidator, async(req, res) => {

    let err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).send({
            success: false,
            errors: err.array().reduce((acc, e) => {acc[e.param] = e.msg; return acc}, {})
        });  
    }

    try{
        let {userName, password} = req.body;
        let foundUser = await User.findOne({userName});
        if(!foundUser){
            return res.send({success:false, errors: {
                userName: "Wrong Username or Password",
                password: "Wrong Username or Password"
            }});
        }

        if(!foundUser.verified){
            return res.send({success:false, errors: { accountVerification: "Account not yet verified" }});
        }

        let same = await bcrypt.compare(password, foundUser.password);
        if(same){
            let token = generateTokens(foundUser);
            res.cookie('refreshToken', token.refreshToken, defaultCookieOptions);
            return res.send({
                success: true, 
                token:token.accessToken
            });
        }
        res.send({success:false, errors: {
            userName: "Wrong Username or Password",
            password: "Wrong Username or Password"
        }});
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
        let fileID = await uploadToDrive(req.file, {
            parent: ['1e23zn0qdTWIEJJYV0yCv9O-XKpi17OKs'],
            userID: newUser._id
        });
        newUser.profilePicture = fileID;
        newUser = await newUser.save();
        let verificationLink = generateVerificationURL(newUser);
        let messageData = {
            to: req.body.email,
            message: `Hello this is the link for your email verification\n\n${verificationLink}`,
            subject: "Didasko Email Verification"
        }
        sendEmail(messageData);
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
    res.cookie('refreshToken', "", {maxAge: 0});
    res.send({success:true});
});

router.get("/refresh", (req, res) => {
    let rToken = req.cookies.refreshToken;
    let tokens = refreshToken(rToken);
    if(tokens.success){
        res.cookie('refreshToken', tokens.refreshToken, defaultCookieOptions);
        return res.send({
            success: true, 
            token:tokens.accessToken
        });
    }
    return res.send({
        success: false, 
        message: tokens.message
    });
});

router.post("/sendMail", async(req, res) => {
    let { to, message } = req.body;
    try{
        let rs = await sendEmail({to, message});
        res.send(rs);
    } 
    catch (e){
        res.send({success: false, errors: [e.message]});
    }
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
        await verifyUser(req.body.uid);
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