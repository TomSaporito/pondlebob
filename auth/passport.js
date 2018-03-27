var LocalStrategy = require('passport-local').Strategy;
var User = require('../db/models/User.js');

module.exports = function(passport){
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
    },
     function(req, username, password, done) {
     console.log('submitted u: ',username);
     console.log('submitted pw: ',password);
         User.findOne({ email: username }, function (err, user) {

            var error;
           if (err) {//failure do to general error in db
            console.log('auth error: ', err);
            error = 'Cannot connect to DB';//add authError to req
            return done(err);
           }
           if (!user) {//failure due to no user
                console.log('no user found');
                error = 'Email/Password do not match out records';//add authError to req
                return done(error, false);
           }
           if (!user.validPassword(password)) {//failure due to pw
                console.log('no pw match');
                error = 'Email/Password do not match out records';//add authError to req
                // console.log(req);
                return done(error, false);
           }
           return done(null, user);//successfully logged in
         });
       }
    ));
}