var passport = require('passport');
require('../auth/passport.js')(passport);
var signKey = require('../auth/auth.js')().signKey;//jwt creator

module.exports = function(express){
  // console.log('Creating Login Routes...')
    var router = express.Router();

    // failWithError: true, -- removed this from  object param (idk why i removed it)
    router.post('/', function(req, res, next){
      return passport.authenticate('local', {session:false, failWithError:true}, function(err, user, info){
      
          var errorObj = {
            error: err, 
            loggedIn: false,
            $type: 'LOGIN_FAIL'
          };

          if (err) { //no pw match
            return res.status(401).send(errorObj);
          }
          if (!user) { //no user found
            return res.status(401).send(errorObj); 
          }
          //success
          return res.json({
            $type: 'LOGIN_SUCCESS',
            loggedIn: true, 
            nickname: user.nickname,
            duels: user.duels,
            lineup: user.lineup,
            level: user.level,
            apiToken: signKey({id: user._id }),
            rememberMe: req.body.rememberMe || false//will return a "truthy" answer
          });
      })(req, res, next);
    });

    return router;

};