const express = require('express');
const router = express.Router();
const { checkSession }= require('../lib/authentication');
const mongoose = require('mongoose');
const Webinar = require('../schemas/webinar');
const EnrollmentVerification = require('../schemas/enrollment_verification');

router.use(checkSession);

router.get("/courses", async(req, res) => {
    
    let { webinars, webinarsTaught } = req.session.user;

    let studentQuery = [];
    let teacherQuery = [];

    for(let key in webinars){
        if(webinars.hasOwnProperty(key))
            studentQuery.push({_id: key});
    }

    for(let key in webinarsTaught){
        if(webinarsTaught.hasOwnProperty(key))
            teacherQuery.push({_id: key});
    }

    let promises = [];

    if(studentQuery.length > 0){
        promises.push(Webinar.find({$or:studentQuery}, 'name bannerLink'));
    }
    else{
        promises.push(Promise.resolve([]));
    }

    if(teacherQuery.length > 0){
        promises.push(Webinar.find({$or:teacherQuery}, 'name bannerLink'));
    }
    else{
        promises.push(Promise.resolve([]));
    }

    let [studentWebinars, teacherWebinars] = await Promise.all(promises);

    return res.send({
        success: true,
        studentWebinars,
        teacherWebinars
    });
});

router.get('/verifications', async(req, res) => {
    let verif = await EnrollmentVerification.findOne({webinarID: req.query.webinarID, userID: req.session.user._id});
    res.send({success: true, requestSent: verif ? true : false});
});

router.get("/enrollment/requests", async(req, res) => {
    let verif = await EnrollmentVerification.find({userID: req.session.user._id}, 'uid webinarName accepted acceptedDate issued');
    res.send({success: true, requests: verif});
});


module.exports = router;