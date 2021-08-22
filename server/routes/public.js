const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Webinar = require('../schemas/webinar');
const User = require('../schemas/user');

router.get("/webinar/recent", async(req, res) => {
    let recentWebinars = await Webinar.find().limit(12).sort({creationDate: -1});
    res.send({success:true, webinars: recentWebinars});
});

router.get("/webinar", async(req, res) => {
    let regExp = new RegExp(req.query.name, "i");
    let recentWebinars = await Webinar.find({name: regExp}, 'name teacher price bannerLink').sort({creationDate: -1});
    res.send({success:true, webinars: recentWebinars});
});

router.get("/user", async(req, res) => {
    res.send({success:true, user: await User.findById(req.query._id, 'userName firstName lastName')});
});

module.exports = router;