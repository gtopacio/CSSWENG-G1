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

module.exports = {authenticateTokens, generateTokens, refreshToken};