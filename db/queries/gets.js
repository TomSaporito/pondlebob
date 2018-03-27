const mongoose = require('mongoose');//3rd party to interact with MongoDB
const UserSchema = require('../models/User.js');//pull in User model
const TempUserSchema = require('../models/TempUser.js');//pull in TempUser
var verifySignup = require('../../auth/email.js')();//sends an email??
var randToken = require('rand-url-token');//generates a random token
const Errors = require('../../router/Error');//all the errors we have

    var getUser = function(){
        var model = {};
            UserSchema.find({}).then(function(data){
                model.data = data;
                console.log('user model: ', model);
                return model;
            });
    }


    /**
     * checks if the user already exists and if not, passes user data to create user
     * 
     * @param {JSON} body - form data 
     * @param {Object} req -request object
     * @param {Object} res - response object
     */
    var doesUserExistAlready = function(body, req, res){

        UserSchema.find({$or: [{email: body.email}, {nickname: body.nickname}]}).then(function(data, err){
           
            if(data[0] && data[0].email == body.email.toString()){
                console.log('user exists');
                // res.send('<h3>A user with that email address already exists</h3><a href="/login">Signup</a>');
                // res.end();
                res.json({
                    emailSent: false,
                    serverAlert: Errors.AUTH_EMAIL_EXISTS
                });
                return true;

            } else if (data[0] && data[0].nickname == body.nickname.toString()){
                console.log('user nickname exists');
                // res.send('<h3>A user with that nickname already exists</h3><a href="/login">Signup</a>');
                // res.end();
                res.json({
                    emailSent: false,
                    serverAlert: Errors.AUTH_NICKNAME_EXISTS
                });
                return true;
            } else {
                //checks if we currently have a temp user with this email
                TempUserSchema.find({email: body.email}).then(function(data){//checking that we deleted the email from tempusers
                    console.log('TEMP', data)
                    var dl = data.length;
                    var rmvd = 0;
                    if(dl > 0){
                        data.forEach(function(entry){
                        console.log('ENTRY ', entry)
                            entry.remove(function(err){
                                if(err){
                                    // res.send('We didnt delete them all');
                                    // res.end('We fucked up');
                                    //we could not delete the temp user and create a new temp user
                                    res.json({
                                        emailSent: false,
                                        serverAlert: Errors.AUTH_TEMPUSER_EXISTS
                                    })
                                }

                                ++rmvd;
                                if(rmvd === dl){//we deleted all instances of that temp user
                                    //now create a new temp user
                                    createTempUser(body, req, res);
                                }
                            });

                        });

                    } else {
                        //this is a brand new person
                        //no temp users found
                        //create a temp user
                        createTempUser(body, req, res);
                    }
                });

            }
        });

    };

    function createTempUser(body, req, res){
        console.log('you are new');
        var token = randToken(20);
        console.log('create a temp user');
        var tempUser = new TempUserSchema();

        tempUser.email = body.email;
        tempUser.password = tempUser.generateHash(body.password);
        tempUser.verificationNum = token;
        tempUser.createdAt = new Date();
        tempUser.nickname = body.nickname;
    

        tempUser.save(function(err){
            if(err){
                // res.send(err);
                // res.send('Signup failed.  Failed to save user.  <a href="/login">Try again</a>');
                // res.end();
                res.json({
                    emailSent: false,
                    serverAlert: Errors.AUTH_TEMPUSER_FAIL
                })
            } else {
                verifySignup.sendEmail(token, 'localhost:3000', req, res);
            }
        });

        return false;
    }

    module.exports.getUser = getUser;
    module.exports.doesUserExistAlready = doesUserExistAlready;