//Required Core and Packages
var path = require('path');//require path from Node core
var bodyParser = require("body-parser");//for parsing body of requests



var auth = require('../auth/auth.js')();//require object with initialize, authenticate, and signKey methods
var {getUser} = require('../db/queries/gets.js');//this is simply a test of abstracting mongoose calls
var signKey = require('../auth/auth.js')().signKey;//creates the JWT  -- do we need this here?


module.exports = function(app, express){
    
    app.use(bodyParser.json());//parse body as json
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(auth.initialize());//initialize passport

    // view engine setup
    app.set('views', path.join(__dirname+'/../public'));//directory to find views
    app.set('view engine', 'jade');//template engine is jade
    app.use(express.static(path.join(__dirname, '../public')));//get static files form public directory


    //import routes
    var loginRoutes = require('./loginRoutes.js')(express);
    var apiRoutes = require('./api/apiRoot.js')(express);
    var signupRoutes = require('./signupRoutes.js')(express);

    app.use('/api', apiRoutes);//for api calls
    app.use('/login', loginRoutes);//for logging into app and signup
    app.use('/signup', signupRoutes);//signup routes

    app.get('*', (req, res)=>{//handling everything else
        res.render('index');
    });

};


// OLD CODE  vvvvv


//old metyhod to route to jade pages
// function renderPath(file){
//    return file+'\\'+file;
// }
// module.exports.renderPath = renderPath;


// app.set('views', path.join(__dirname+'/../public/jade_views/'));
//     var signupRoutes = require('./signupRoutes.js')(express, renderPath);
//     var verifyUserRoutes = require('./verifyUserRoutes.js')(express, renderPath);
    // var apiRoutes = require('./api/apiRoot.js')(express, renderPath);
//     var logoutRoutes = require('./logoutRoutes.js')(express, renderPath);
// //    var moveNames = require('./api/apiMoveNames.js')(express, renderPath);

    
//     app.use('/signup', signupRoutes);
//     app.use('/verify', verifyUserRoutes);
//     app.use('/home/api', apiRoutes);
//     app.use('/api', (req, res)=>{
//         console.log(req);
//         console.log('API')
//     });
//     // app.use('*', (req, res)=>{
//     //     res.render('index', {title: 'Home'});
//     // });
//     app.use(['/home','/lineup','/duel', '/settings'], function(req, res){
//         console.log('I am going to home');
//         res.render('index', {title: 'Home'});
//     });
//     app.use('/logout', logoutRoutes);
    