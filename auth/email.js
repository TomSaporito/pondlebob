var express = require('express');
var nodemailer = require("nodemailer");//lib to send emails
var smtpTransport = require('nodemailer-smtp-transport');//lib to send emails
var {gm, gmpw} = require('../db/creds.js');//gmail and pw
const Errors = require('../router/Error');

var app = express();






module.exports = function(randToken, host, req, res) {

    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {

            user: gm,
            pass: gmpw

        }
    });
    var mailOptions, link;
    /*------------------SMTP Over-----------------------------*/

    /*------------------Routing Started ------------------------*/



    var sendEmail = function(randToken, host, req, res) {

        link = "http://" + host + "/verify?id=" + randToken;
        console.log(link);
        mailOptions = {
            to: req.body.email,
            subject: "Pondlebob - Please confirm your Email account",
            html: "<h1>Hello, from Pondlebob!</h1><br> Please click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
        }

        smtpTransport.sendMail(mailOptions, async function(error, response) {

            await error;
            await response;

            if (error) {
                // console.log(error);
                // res.end("error");
                res.json({
                    emailSent: false,
                    serverAlert: Errors.AUTH_SIGNUPEMAIL,
                    msg: error
                });
                return false;
            } else if (response){
                console.log("Message sent to " + response.accepted);
                // res.send("An email has been sent to <strong>"+response.accepted+"</strong>");
                res.json({
                    emailSent: true,
                    msg: `An email has been sent to ${response.accepted}`
                });

                return true;
            }
        });
    };


    return {
        sendEmail: sendEmail
    };

     app.get('/verify', function(req, res) {
         console.log(req.protocol + ":/" + req.get('host'));
         if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
             console.log("Domain is matched. Information is from Authentic email");
             if (req.query.id == rand) {
                 console.log("email is verified");
                 res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");
             } else {
                 console.log("email is not verified");
                 res.end("<h1>Bad Request</h1>");
             }
         } else {
             res.end("<h1>Request is from unknown source");
         }
     });



}