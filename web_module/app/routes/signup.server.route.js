/**
 * Created by vipul on 4/23/2016.
 */
var user = require('../controllers/user.server.controller'),
    passport = require('passport');

module.exports = function(app){

    app.route('/api/signupPerson')
        .post(user.signup);

    // route to test if the user is logged in or not
    app.get('/signedin', function(req, res) {
        console.log("inside /signedin "+req.isAuthenticated());
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.get('/signout', user.signout)
}