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
    console.log('inside server controller signup' + JSON.stringify(req.body))
    if (!req.user) {
       var  email = req.body.email,
           password = req.body.password,
           firstname = req.body.firstname,
           lastname = req.body.lastname,
           role_id = req.body.role_id;

        if(role_id == 1 || role_id == 2)
            var approved = 0;
        else
            var approved=1;

        console.log("pass is "+password)
        console.log("role id is "+role_id);

            bcrypt.hash(password, 10, function(err,hash){
                console.log("hash is "+hash);
                bcrypt.compare(password, hash, function(err, result) {
                    if (err) { console.log ("error is" +err); }
                    console.log("res is "+result);
                });
                password = hash;

                // var query = "exec dbo.sp_insert_person 'vipul.sarin@google.com','abcde','Vipul','Sarin'"
                var query = "insert into users (email, password,firstname,lastname,role_id,approved) values (:email, :password, :firstname, :lastname, :role_id, :approved)";
                sequelize.query(query, { replacements: {email: email, password: password, firstname: firstname, lastname: lastname, role_id: role_id, approved: approved }})
                    .then(function(success) {
                        console.log("signup person successful"+JSON.stringify(success));
                        req.login({"email" : email}, function(err){
                            if (err) return next(err);
                            return res.redirect('/');
                        });
                        return res.json(success[0]);
                        });
                    })

    } else {
        return res.redirect('/');
    }
};