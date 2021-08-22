const express = require("express");
const session = require('express-session');
const mongoose = require('mongoose');

require("dotenv").config();
const PORT = process.env.PORT;
const DB_URL = process.env.MONGO_URL;
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => console.log("MongoDB successfully connected"));
mongoose.connection.on('error', () => console.log("Error in connecting to MongoDB"));

const app = express();

const sessionStore = require('connect-mongo').create({
    mongoUrl: process.env.MONGO_URL,
    autoRemove: 'interval',
    autoRemoveInterval: 10
});

app.set('trust proxy', 1);
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 31*24*60*60*100, 
    httpOnly: true, 
    secure: process.env.NODE_ENV == 'production',
    sameSite: true
    },
  store: sessionStore
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', require('./routes/api.js'));
app.use('/api/admin', require('./routes/admin.js'));
app.use('/api/accounts', require('./routes/accounts.js'));
app.use('/api/public', require('./routes/public.js'));
app.use('/api/webinar', require('./routes/webinars.js'));

app.listen(PORT, () => console.log(`Listening at Port: ${PORT}`));