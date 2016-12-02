/**
 * Created by Dhruvraj on 12/1/2016.
 */
var sequelize = require("../../config/sequelize").getSequelize,
    bcrypt = require('bcryptjs');


exports.resetpassword=function(req,res){

    var password=req.query.newPassword;
    console.log(password);
    bcrypt.hash(password, 10, function(err,hash) {
        console.log("hash is " + hash);
        bcrypt.compare(password, hash, function (err, result) {
            if (err) {
                console.log("error is" + err);
            }
            console.log("res is " + result);
        });
        password = hash;

    var email=req.user[0]["email"];
    var query="update users set password=:password where email=:email"
    sequelize.query(query, {replacements: {password: password,email: email},type: sequelize.QueryTypes.UPDATE})
        .then(function(response,error) {
            if(error)
            {
                console.log("error is "+JSON.stringify(error))
                return res.status(500).send({ error: 'Password update returned error'+err });
            }
            else
            {
                console.log(JSON.stringify("Password updated"+JSON.stringify(response)));
                return res.json(response);
            }
        })
    });
}

exports.updateuser=function(req,res){
    var firstname=req.user[0]["firstname"];
    var lastname=req.user[0]["lastname"];
    if(req.query.firstname){
        firstname=req.query.firstname;
    }
    if(req.query.lastname){
       lastname=req.query.lastname;
    }
    var email=req.user[0]["email"];
    var query="update users set firstname=:firstname,lastname=:lastname where email=:email";
    sequelize.query(query, {replacements: {firstname: firstname,lastname: lastname,email: email},type: sequelize.QueryTypes.UPDATE})
        .then(function(response,error) {
            if(error)
            {
                console.log("error is "+JSON.stringify(error))
                return res.status(500).send({ error: 'Update Details'+err });
            }
            else
            {
                console.log(JSON.stringify("Update Details Success"+JSON.stringify(response)));
                return res.json(response);
            }
        });
}