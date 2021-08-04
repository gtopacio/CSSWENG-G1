const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const {generateTokens, authenticateTokens, refreshToken} = require("../lib/helpers");
const multer = require("multer");
const upload = multer({ dest: './uploads' });
const { uploadToDrive } = require("../lib/google_api");

const defaultCookieOptions = {
    maxAge: 31*24*60*60*100, 
    httpOnly: true, 
    secure: process.env.NODE_ENV == 'production',
    sameSite: true
};

require('dotenv').config();
const DB_URL = process.env.MONGO_URL;
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, });
mongoose.connection.on('connected', () => console.log("MongoDB successfully connected"));

router.post("/login", async(req, res) => {
    try{
        let {userName, password} = req.body;
        let foundUser = await User.findOne({userName});
        if(foundUser){
            let same = await bcrypt.compare(password, foundUser.password);
            if(same){
                let token = generateTokens(foundUser);
                res.cookie('refreshToken', token.refreshToken, defaultCookieOptions);
                return res.send({
                    success: true, 
                    token:token.accessToken
                });
            }
        }
        res.send({success:false, message: "Wrong Username or Password"});
    }
    catch(e){
        res.send({success:false, message: e.message});
    }
});

router.post("/signup", upload.single('profilePicture'), async(req, res) => {
    try{
        let saltRound = 10;
        req.body.password = await bcrypt.hash(req.body.password, saltRound);
        let info = req.body;
        info.admin = false;
        let newUser = new User(info);
        let fileID = await uploadToDrive(req.file, {
            parent: ['1e23zn0qdTWIEJJYV0yCv9O-XKpi17OKs'],
            userID: newUser._id
        });
        newUser.profilePicture = fileID;
        newUser = await newUser.save();
        let token = generateTokens(newUser);
        res.cookie('refreshToken', token.refreshToken, defaultCookieOptions);
        return res.send({
            success: true, 
            token:token.accessToken
        });
    }
    catch(e){
        console.error(e);
        res.sendStatus(500).send({success:false, message: e.message});
    }
});

router.post("/logout", (req, res) => {
    res.cookie('refreshToken', "", {maxAge: 0});
    res.send({success:true});
});

router.post("/protected", authenticateTokens, (req, res) => {
    res.send("Success!");
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

module.exports = router;