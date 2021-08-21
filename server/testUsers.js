const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./schemas/user');

const saltRounds = 10;

require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => init());
mongoose.connection.on('error', () => console.log("Error in connecting to MongoDB"));

const init = async() => {
    let promises = [];

    promises.push(new User({
        userName: "asd",
        password: bcrypt.hashSync("asd", saltRounds),
        firstName: "asd",
        lastName: "asd",
        email: "asd@asd.com",
        verified: true,
        admin: false
    }).save());

    promises.push(new User({
        userName: "qwe",
        password: bcrypt.hashSync("qwe", saltRounds),
        firstName: "qwe",
        lastName: "qwe",
        email: "qwe@qwe.com",
        verified: true,
        admin: false
    }).save());

    promises.push(new User({
        userName: "zxc",
        password: bcrypt.hashSync("zxc", saltRounds),
        firstName: "zxc",
        lastName: "zxc",
        email: "zxc@zxc.com",
        verified: true,
        admin: false
    }).save());

    await Promise.all(promises);
    console.log("Finish");
}