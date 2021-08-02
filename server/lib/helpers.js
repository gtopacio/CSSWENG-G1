const jwt = require("jsonwebtoken");

require("dotenv").config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

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
    let { userName, email, firstName, lastName, admin } = user;
    try{
        let payload = {firstName, lastName, userName, email, admin};
        let token = {};
        token.accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        token.refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '31d'});
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
        let {firstName, lastName, userName, email, admin} = jwt.verify(rToken, REFRESH_TOKEN_SECRET);
        decoded = {firstName, lastName, userName, email, admin};
        res.accessToken = jwt.sign(decoded, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        res.refreshToken = jwt.sign(decoded, REFRESH_TOKEN_SECRET, {expiresIn: '31d'});
        res.success = true;
        return res;
    }
    catch(e){
        res.message = e.message;
        return res;
    }
}

module.exports = {authenticateTokens, generateTokens, refreshToken};