var passport = require('passport');
require('../auth/passport.js')(passport);
var signKey = require('../auth/auth.js')().signKey;

module.exports = function(express, renderPath){
    var router = express.Router();

    router.get("/", function(req, res) {
        res.redirect('/home');
    });


    return router;

};