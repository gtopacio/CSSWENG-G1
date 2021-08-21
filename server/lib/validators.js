const { check: body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const User = require('../schemas/user');
const appDir = path.dirname(require.main.filename);

const loginValidator = [
    body('userName', 'Username must not be empty').trim().notEmpty().escape(),
    body('password', 'Password must not be empty').notEmpty()
];

const signupValidator = [
    body('userName', "Username has an invalid value").notEmpty().trim().escape(),
    body('userName', "Username has an invalid value").custom((value) => {
        return User.findOne({userName: value}, 'userName').then(user => {
          if (user) {
            if(user.userName === value){
                return Promise.reject("Username has already been used");
            }
          }
        });
      }),
    body('password', "Password Minimum Length not reached").isLength({ min: 8 }),
    body('confirmPassword').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords are not the same');
          }
          return true;
    }),
    body('firstName', 'First Name should not be empty').trim().notEmpty().escape(),
    body('lastName', 'Last Name should not be empty').trim().notEmpty().escape(),
    body('email', "Email is empty").notEmpty(),
    body('email', "Email is not a valid email").isEmail().normalizeEmail(),
    body('email').custom((value) => {
        return User.findOne({email: value}, 'email').then(user => {
            if (user) {
              if(user.email === value){
                  return Promise.reject("Email has already been used");
              }
            }
      })
    })
];

const verificationValidator = [
    body("uid").notEmpty().trim().escape()
]

const webinarRegistration = [
    body("name").notEmpty().trim().escape(),
    body("price", "Price is not a number").isDecimal()
]

const teacherRegistration = [
    body("webinarID").notEmpty().trim(),
    body("teacherID").notEmpty().trim()
]

const studentRegistration = [
    body("webinarID").notEmpty().trim(),
    body("studentID").notEmpty().trim()
]

const signupProfilePicture = (req, res, next) => {
    let err = validationResult(req);
    if(!err.isEmpty()){
        res.status(400).send({
            success: false,
            errors: err.array().reduce((acc, x) => {acc[x.param] = x.msg; return acc;}, {})
        });
        if(req.file){
            fs.unlink(path.join(appDir, "uploads", req.file.filename), ()=>{return;});
        }
        return;
    }
    if(!req.file){
        return res.status(400).send({
            success: false,
            errors: {profilePicture: "No Profile Picture uploaded"}
        });
    }
    const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(validMimeTypes.indexOf(req.file.mimetype) === -1){
        res.status(400).send({
            success: false,
            errors: {profilePicture: "Invalid file type"}
        });
        if(req.file){
            fs.unlink(path.join(appDir, "uploads", req.file.filename), ()=>{return;});
        }
        return;
    }
    next();
};

module.exports = {
    loginValidator, 
    signupValidator, 
    signupProfilePicture, 
    verificationValidator, 
    webinarRegistration,
    teacherRegistration,
    studentRegistration
};
