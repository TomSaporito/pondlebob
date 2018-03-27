var TempUser = require('../db/models/TempUser');
var User = require('../db/models/User.js');
var {accountStatus} = require('../db/creds.js');


function signUpNewUser(req, res){

    TempUser.findOne({verificationNum: req.query.id}).then(function(data){
        var user = new User();
        user.email = data.email;
        user.password = data.password;
        user.createdAt = data.createdAt;
        user.accountStatus = accountStatus.active;
        user.nickname = data.nickname;
        user.save(function(err){
            if(err){
                console.log(err);
                res.send('Signup failed.  Failed to transfer over to permanent account.  <a href="/login">Try again</a>');
                res.end();
            } else {
            console.log('removing tempuser')
                data.remove(function(err){
                    if(err){
                        res.send('we failed to delete you temp user.  You must sign up again. <a href="/login>Try again</a>');
                        res.end();
                    }

                    res.render('success-signup');


                });

            }
        });
    });
}


module.exports = function(express, renderPath){
    var router = express.Router();
    router.get('/', function(req, res){
        signUpNewUser(req, res);
    });

    return router;

};
