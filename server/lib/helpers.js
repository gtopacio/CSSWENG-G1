const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const Verification = require('../schemas/verification');
const User = require('../schemas/user');
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const DB_URL = process.env.MONGO_URL;
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

function authenticateTokens(req, res, next){
    let {token} = req.body;
    try{
        let decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.payload = decoded;
        next();
    }
    catch(e){
        res.sendStatus(403);
        console.error(e);
    }
}

function generateTokens(user){
    let { userName, email, firstName, lastName, admin, profilePicture } = user;
    try{
        let payload = {firstName, lastName, userName, email, admin, profilePicture};
        let token = {
            accessToken: jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '15m'}),
            refreshToken: jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '31d'})
        };
        return token;
    }
    catch(e){
        throw e;    
    }
}

function refreshToken(rToken){
    let res = {
        success: false,
        accessToken: "",
        refreshToken: ""
    };
    try{
        let {exp, iat, ...decoded} = jwt.verify(rToken, REFRESH_TOKEN_SECRET);
        let res = generateTokens(decoded);
        res.success = true;
        return res;
    }
    catch(e){
        res.message = e.message;
        return res;
    }
}

function generateVerificationURL(user){
    let date = new Date();
    let verificationInfo = {
        uid: uuidv4(),
        userName: user.userName,
        email: user.email,
        issued: date,
        expires: new Date(date.getFullYear() + 1)
    };
    let newVerification = new Verification(verificationInfo);
    newVerification.save();
    return `http://localhost:3000/verify/${verificationInfo.uid}`;
}

async function verifyUser(uid){
    try{
        let verificationRecord = await Verification.findOne({uid});
        if(!verificationRecord){
            throw new Error("Not valid ID");
        }
        await User.updateOne({userName: verificationRecord.userName}, { $set: {verified: true}} );
        Verification.deleteOne({uid});
    }
    catch (e){
        throw e;
    }
}

module.exports = {authenticateTokens, generateTokens, refreshToken, generateVerificationURL, verifyUser};