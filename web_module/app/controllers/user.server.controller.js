/**
 * Created by vipul on 4/23/2016.
 */
var sequelize = require("../../config/sequelize").getSequelize,
    bcrypt = require('bcryptjs');


exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

exports.signup = function(req, res, next) {
    console.log('inside server controller signup' + JSON.stringify(req.user))
    if (!req.user) {
       var  email = req.body.email,
           password = req.body.password,
           firstname = req.body.firstname,
           lastname = req.body.lastname,
           role_id = req.body.role_id

        console.log("pass is "+password)

        bcrypt.hash('mypassword', 10, function(err, hash) {
            if (err) { console.log ("online hash err is "+err); }

            bcrypt.compare('mypassword', hash, function(err, result) {
                if (err) { console.log ("online compare err is "+err); }
                console.log("online res is "+result);
            });
        });

            bcrypt.hash(password, 10, function(err,hash){
                console.log("hash is "+hash);
                bcrypt.compare(password, hash, function(err, result) {
                    if (err) { console.log ("error is" +err); }
                    console.log("res is "+result);
                });
                password = hash;

                // var query = "exec dbo.sp_insert_person 'vipul.sarin@google.com','abcde','Vipul','Sarin'"
                var query = "insert into users (email, password,firstname,lastname,role_id) values (:email, :password, :firstname, :lastname, :role_id)";
                sequelize.query(query, { replacements: {email: email, password: password, firstname: firstname, lastname: lastname, role_id: role_id }})
                    .then(function(success) {
                        console.log(JSON.stringify("exec dbo.sp_insert_person successful"));
                        return res.redirect('/dashboard');
                        });
                    })

    } else {
        return res.redirect('/');
    }
};