//dependencies
var passport = require('passport');
var passportJWT = require('passport-jwt');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;


var {jwtSecret, jwtSession} = require('../db/creds.js');
var params = {
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromHeader('bearer')
};



module.exports = function(){
    var strategy = new Strategy(params, function(payload, done){

        done(null, payload);
    });

    passport.use(strategy);


    //returning two functions
    // 1) obj.initialize
    // 2) obj.authenticate
    return {
        signKey: function(userObj){
            //will convert userObj into jwt
            var payload = {
                id: userObj.id
            };
            var token = jwt.sign(payload, params.secretOrKey, {expiresIn: '1h' });
            return token;
        },
        initialize: function(){
           return passport.initialize();
        },
        authenticate: function(){
            console.log('authenticating');
            return passport.authenticate("jwt", jwtSession);
        }

    };

};