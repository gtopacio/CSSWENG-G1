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

    if(req.query.webinarID){
        let webinar = await Webinar.findById(req.query.webinarID, 'name teacher price bannerLink schedule')
        return res.send({success:true, webinar});
    }

    let regExp = new RegExp(req.query.name, "i");
    let recentWebinars = await Webinar.find({name: regExp}, 'name teacher price bannerLink schedule').sort({creationDate: -1});
    res.send({success:true, webinars: recentWebinars});
});

router.get("/user", async(req, res) => {
    res.send({success:true, user: await User.findById(req.query._id, 'userName firstName lastName profilePicture profilePictureLink')});
});

router.get("/user/name", async(req, res) => {
    let regExp = new RegExp(req.query.name, "i");
    let users = await User.find({$or: [{firstName: regExp}, {lastName: regExp}]}, 'firstName lastName profilePicture profilePictureLink');
    res.send({success:true, users});
});

module.exports = router;