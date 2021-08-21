const express = require('express');
const { validationResult } = require('express-validator');

const authLib = require('../lib/authentication');
const validators = require("../lib/validators");
const Webinar = require("../schemas/webinar");
const User = require("../schemas/user");
const { uploadToDrive } = require('../lib/google_api');
const upload = require('multer')({ dest: './uploads' });

const router = express.Router();

router.use(authLib.checkSession);

router.use((req, res, next) => {
    if(!req.session.user.admin){
        return res.status(403).send({success:false});
    }
    next();
});

router.post("/webinar", upload.single('banner'), validators.webinarRegistration, async(req, res) => {
    let err = validationResult(req);
    if(!err.isEmpty()){

        if(req.file){
            fs.unlink(path.join(appDir, "uploads", req.file.filename), ()=>{return;});
        }

        return res.status(400).send({
            success: false,
            errors: err.array.reduce((acc, val) => {acc[val.param] = val.message; return acc}, {})
        });
    }

    let webinarInfo = {
        name: req.body.name,
        teachers: {},
        lastUpdate: Date.now()
    };

    let fileID = '';
    if(req.file){
        fileID = await uploadToDrive(req.file, {parent: ['1OaiYeweiYIS36lmLzwX_bnFsmflsZiQ0'], userID: req.session.user._id});
    }

    if(fileID !== ''){
        webinarInfo.bannerID = fileID;
        webinarInfo.bannerLink = `https://drive.google.com/uc?id=${fileID}`
    }

    let newWebinar = new Webinar(webinarInfo);

    await newWebinar.save();

    res.status(200).send({success:true});
});

// Handles assigning of teachers on webinars
router.post("/teacher", validators.teacherRegistration, async(req, res) => {
    let err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).send({
            success: false,
            errors: err.array.reduce((acc, val) => {acc[val.param] = val.message; return acc}, {})
        });
    }

    let {webinarID, teacherID} = req.body;

    let [webinar, teacher] = await Promise.all([
        Webinar.findById(webinarID, 'teachers'), 
        User.findById(teacherID, 'webinarsTaught webinars')
    ]);

    if(!webinar || !teacher){
        return res.status(400).send({
            success:false,
            errors: {
                webinarID: !webinar ? "Webinar not found" : null,
                teacherID: !teacher ? "Teacher not found" : null
            }
        });
    }

    if(teacher.webinars && teacher.webinars[webinarID])
        return res.status(400).send({
            success: false,
            errors: {
                teacherID: "Teacher is already a student on the webinar"
            }
        });

    if(!webinar.teachers)
        webinar.teachers = {}

    if(!teacher.webinarsTaught)
        teacher.webinarsTaught = {}

    webinar.teachers[teacherID] = true;
    teacher.webinarsTaught[webinarID] = true;

    await Promise.all([
        Webinar.updateOne({_id: webinarID}, {$set: {teachers: webinar.teachers}}),
        User.updateOne({_id: teacherID}, {$set: {webinarsTaught: teacher.webinarsTaught}})
    ]);

    res.status(200).send({success:true});
});

// Handles assigning of students on webinars
router.post("/student", validators.studentRegistration, async(req, res) => {
    let err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).send({
            success: false,
            errors: err.array.reduce((acc, val) => {acc[val.param] = val.message; return acc}, {})
        });
    }

    let {webinarID, studentID} = req.body;

    let [webinar, student] = await Promise.all([
        Webinar.findById(webinarID, 'students'), 
        User.findById(studentID, 'webinarsTaught webinars')
    ]);

    if(!webinar || !student){
        return res.status(400).send({
            success:false,
            errors: {
                webinarID: !webinar ? "Webinar not found" : null,
                studentID: !student ? "Student not found" : null
            }
        });
    }

    if(student.webinarsTaught && student.webinarsTaught[webinarID])
        return res.status(400).send({
            success: false,
            errors: {
                studentID: "Student is already a teacher in the webinar"
            }
        });

    if(!webinar.students)
        webinar.students = {}

    if(!student.webinars)
        student.webinars = {}

    webinar.students[studentID] = true;
    student.webinars[webinarID] = true;

    await Promise.all([
        Webinar.updateOne({_id: webinarID}, {$set: {students: webinar.students}}),
        User.updateOne({_id: studentID}, {$set: {webinars: student.webinars}})
    ]);

    res.status(200).send({success:true});
});

router.get("/webinars", async(req, res) => {
    let { name } = req.query;
    name = name ? {name:new RegExp(name, "i")} : {};
    res.send(await Webinar.find(name, 'name creationDate teachers students bannerLink'));
});

router.get("/users", async(req, res) => {
    let conditions = Object.keys(req.query).reduce((prev, curr) => {
        prev[curr] = new RegExp(req.query[curr], "i");
        return prev;
    }, {});
    conditions = !conditions ? {admin:false} : {...conditions, admin:false};
    res.send(await User.find(conditions, 'userName firstName lastName email'));
});

module.exports = router;