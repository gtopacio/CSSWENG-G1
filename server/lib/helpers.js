const jwt = require("jsonwebtoken");

require("dotenv").config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

function authenticateTokens(req, res, next){
    let {token} = req.body;
    try{
        let decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.payload = decoded;
        console.log(decoded);
        next();
    }
    catch(e){
        res.sendStatus(403);
        console.error(e);
    }
}

function generateTokens(user){
    let {firstname, lastname, email, admin} = user;
    try{
        let payload = {firstname, lastname, email, admin};
        let token = {};
        token.accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        token.refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '31d'});
        return token;
    }
    catch(e){
        throw e;    
    }
}

module.exports = {authenticateTokens, generateTokens};