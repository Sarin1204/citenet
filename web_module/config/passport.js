/**
 * Created by vipul on 4/23/2016.
 */
var passport = require('passport')

var sequelize = require("./sequelize").getSequelize;

module.exports = function(){

    passport.serializeUser(function(person, done){
        console.log("serial person == "+JSON.stringify(person));
        console.log(person.email)
        done(null, person.email);
    });

    passport.deserializeUser(function(email, done){
        console.log('deserial email == '+email);
        var query = "select email, firstname, lastname, role_id from users where email = :email";
        sequelize.query(query, { replacements: {email: email }, type: sequelize.QueryTypes.SELECT})
            .then(function(person) {
                done(null,person);
            })

    });
    require('./strategies/local.js')();
    //require('./strategies/facebook.js')();
};