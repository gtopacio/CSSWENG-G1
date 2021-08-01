const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./schemas/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const {generateTokens, authenticateTokens} = require("./lib/helpers");

require("dotenv").config();
const PORT = process.env.PORT;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

const DB_URL = process.env.MONGO_URL;
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(COOKIE_SECRET, {
    maxAge: 31*24*60*60*100, 
    httpOnly: true, 
    secure: process.env.NODE_ENV == 'production'
}));

app.post("/login", async(req, res) => {
    try{
        let {userName, password} = req.body;
        let foundUser = await User.findOne({userName});
        if(foundUser){
            let same = await bcrypt.compare(password, foundUser.password);
            if(same){
                let token = generateTokens(foundUser);
                res.cookie('refreshToken', token.refreshToken);
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

app.post("/signup", async(req, res) => {
    try{
        let saltRound = 10;
        req.body.password = await bcrypt.hash(req.body.password, saltRound);
        let info = req.body;
        info.admin = false;
        let newUser = new User(info);
        let saved = await newUser.save();
        res.redirect(307, "/login");
    }
    catch(e){
        res.sendStatus(500).send({success:false, message: e.message});
    }
});

app.post("/protected", authenticateTokens, (req, res) => {
    res.send("Success!");
});

app.get("/refresh", (req, res) => {
    console.log(req.cookie);
    return res.send("Test");
});

app.listen(PORT, () => console.log(`Listening at Port: ${PORT}`));