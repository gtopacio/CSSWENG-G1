const express = require('express');
const router = express.Router();
const { checkSession }= require('../lib/authentication');
const mongoose = require('mongoose');
const Webinar = require('../schemas/webinar');

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


module.exports = router;