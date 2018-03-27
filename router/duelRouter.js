module.exports = function(express, renderPath){
    var router = express.Router();

    router.get("/", function(req, res) {
        res.redirect('login');
    });
    router.get('/login', function(req, res){
        res.render(renderPath('login'));
    });

    router.post('/login',
      passport.authenticate('local', { failureRedirect: '/login', session: false }),
      function(req, res) {
        res.render(renderPath('home'), {title: 'Home', token: signKey({id: req.user._id })});
      }
    );

    function redirectContext(route,obj){

    }

    return router;

};