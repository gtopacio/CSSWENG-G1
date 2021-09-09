const mongoose = require('mongoose');
const Verification = require('../schemas/verification');
const User = require('../schemas/user');
const { v4: uuidv4 } = require('uuid');

function checkSession(req, res, next){
    if(!req.session.user){
        return res.sendStatus(403);
    }
    next();
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

function trimUserInfo(user){
    const fields = [
        "_id",
        "userName",
        "firstName",
        "lastName",
        "verified",
        "admin",
        "profilePicture",
        "profilePictureLink",
        "email",
        "webinars",
        "webinarsTaught"
    ];

    let keys = Object.keys(user);

    return fields.reduce((prev, curr) => { if(keys.includes(curr)) prev[curr] = user[curr]; return prev}, {});
}

module.exports = {checkSession, trimUserInfo, generateVerificationURL, verifyUser};