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
    body('userName').notEmpty().trim().escape(),
    body('password', "Password Minimum Length not reached").isLength({ min: 8 }),
    body('firstName', 'First Name should not be empty').trim().notEmpty().escape(),
    body('lastName', 'Last Name should not be empty').trim().notEmpty().escape(),
    body('email', "Email is not a valid email").notEmpty().isEmail().normalizeEmail(),
    body('email').custom((value, {req}) => {
        return User.findOne({$or:[{email: value}, {userName: req.body.userName}]}, 'userName email').then(user => {
          if (user) {
            if(user.userName === req.body.userName)
                return Promise.reject("Username has already been used");
            if(user.email === value)
                return Promise.reject("Email has already been used");
          }
        });
      })
];

const verificationValidator = [
    body("uid").notEmpty().trim().escape()
]

const signupProfilePicture = (req, res, next) => {

    console.log(req.body);

    let err = validationResult(req);
    if(!err.isEmpty()){
        res.status(400).send({
            success: false,
            errors: err.array().map(e => e.msg),
            origin: "profile picture middleware"
        });
        if(req.file){
            fs.unlink(path.join(appDir, "uploads", req.file.filename), ()=>{return;});
        }
        return;
    }
    if(!req.file){
        return res.status(400).send({
            success: false,
            errors: ["No Profile Picture uploaded"]
        });
    }
    const validMimeTypes = ['image/jpeg', 'image/png'];
    if(validMimeTypes.indexOf(req.file.mimetype) === -1){
        res.status(400).send({
            success: false,
            errors: ["Invalid file type"]
        });
        if(req.file){
            fs.unlink(path.join(appDir, "uploads", req.file.filename), ()=>{return;});
        }
        return;
    }
    next();
};

module.exports = {loginValidator, signupValidator, signupProfilePicture, verificationValidator};
