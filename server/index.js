const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

require("dotenv").config();
const PORT = process.env.PORT;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(COOKIE_SECRET));

app.use('/api', require('./routes/api.js'));

app.listen(PORT, () => console.log(`Listening at Port: ${PORT}`));