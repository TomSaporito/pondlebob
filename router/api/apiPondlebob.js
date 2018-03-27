var passport = require('passport');
var Pondlebob = require('../../db/models/Pondlebob.js');
var User = require('../../db/models/User.js');

module.exports = function(express, renderPath){
    var router = express.Router();

    router.post('/', passport.authenticate('jwt', { session: false }), function(req, res){

        var body = req.body;


        User.findOne({_id: req.user.id}).then(function(user, err){
            if (err) {
                throw err;
            }

            if (user) {
                //save pondlebob
                //then response
            }


        });
    });

    router.get('/', function(req, res){
        res.send('Hello')
    });

    return router;
};