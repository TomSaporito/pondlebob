var passport = require('passport');
var User = require('../../db/models/User.js');

//
//custom queries

//
//pull in routes
var createPondlebobRoutes = require('./apiCreatePondlebob.js');
var pondlebobRoutes = require('./apiPondlebob.js');



module.exports = function(express, renderPath){
    var router = express.Router();

//    router.get('/', passport.authenticate('jwt', { session: false }), function(req, res){
//        console.log(req.user);
//        res.json("Success! You can not see this without a token.  Please make a request");
//    });

//    router.get('/example', passport.authenticate('jwt', { session: false }), function(req, res){
//
//    });

    router.use('/create-pondlebob', createPondlebobRoutes(express, renderPath));


    router.get(['/','/user'], passport.authenticate('jwt', { session: false }), 
        function(req, res){
            console.log('getting user');
            console.log(req,'/REQUEST');
            User.findOne({_id: req.user.id}).then(function(user, err){
                var model = {};
                if(err){
                    res.json(err);
                }

                console.log('Got user: ', user);

                user.password = '';

                model.nickname = user.nickname

                if(!user.nickname){
                    model.needNickname = true;
                }
                if(!user.lineup || user.lineup.length < 6){
                    model.needLineUp = true;
                }
                model.duels = user.duels;

                model.$type= 'LOGIN_SUCCESS';
                model.loggedIn= true;
                

                console.log(model)
                res.json(model);
        },
    
        function(err, req, res, next){
            res.json({fail: true});
        });

    });

  

    router.get('/shit', (req, res)=>{
        res.json({shit: 'Tom'});
    });


    router.use('/pondlebob', pondlebobRoutes(express, renderPath));

    return router;
};