const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ChatMessage = require('../schemas/chat_message');
const { checkSession } = require('../lib/authentication');

router.use(checkSession);

router.get("/messages", async(req, res) => {
    let messages = await ChatMessage.find({threadID: req.query.id}).sort({index: 1});
    messages = messages ? messages : [];
    res.send({success: true, messages});
});

module.exports = router;