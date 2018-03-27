var TempUser = require('../db/models/TempUser');
var Errors = require( './Error');


var {doesUserExistAlready} = require('../db/queries/gets');
//var createTempUser;

module.exports = function(express){
    var router = express.Router();

    router.post('/', function(req, res){
    console.log(req.body)
        if(req.body.password == req.body.confirmPassword){
            doesUserExistAlready(req.body, req, res);
        } else {
            // res.send('Your passwords do not match.  <a href="/login">Try again</a>');
            // res.end();
            res.json({
                emailSent: false,
                serverAlert: Errors.AUTH_PW_MISMATCH
            });
        }
    });



    return router;

};