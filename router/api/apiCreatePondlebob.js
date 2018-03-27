const CreatePondlebobSchema = require('../../db/models/CreatePondlebob.js');
const passport = require('passport');


module.exports = function(express, renderPath){

    const router = express.Router();

    router.get('/', passport.authenticate('jwt', { session: false }), function(req, res){
        var model = {};
        CreatePondlebobSchema.find().then(function(cpb, err){
            if(err){
                res.json({error: true, errorCode: 'Auth_001', errorTime: Date.now(), errorMsg: 'We could not authorize your request.'});
                throw err
            } else {
                console.log(cpb)
                model.moves = cpb[0].names;
                model.animations = cpb[0].animations;
                res.json(model);
            }
        });

    });

    return router;
};