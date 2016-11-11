/**
 * Created by vipul on 4/27/2016.
 */
var passport = require('passport');

/*module.exports = function(app){
 app.route('/api/signinParent')
 .post(passport.authenticate('local',{
 failureFlash: true
 }));
 };*/
module.exports = function(app) {
    app.post('/api/signinPerson', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                console.log("error in signin server "+JSON.stringify(info));
                return res.status(401).send({ error:info["message"] });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.json({status:"passed"});
            });
        })(req, res, next);
    });
}
