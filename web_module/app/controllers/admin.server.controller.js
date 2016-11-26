var sequelize = require("../../config/sequelize").getSequelize;

exports.adminDisplay = function(req, res) {

    // var query = "exec dbo.sp_insert_person 'vipul.sarin@google.com','abcde','Vipul','Sarin'"
    var query = "select email,approved from users";
    sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
        .then(function(response,error) {
            if(error)
            {
                console.log("error is "+JSON.stringify(error))
                return res.status(500).send({ error: 'getUsers returned error'+err });
            }
            else
            {
                console.log(JSON.stringify("Users retrieved"+JSON.stringify(response)));
                return res.json(response);
            }
        })
};


exports.deleteUser = function(req, res) {
    console.log('inside Admin delete controller')

   // var query = "exec dbo.sp_insert_person 'vipul.sarin@google.com','abcde','Vipul','Sarin'"
    var query = "delete from users where email=\""+req.query.email+"\"";
    sequelize.query(query, {type: sequelize.QueryTypes.DELETE})
        .then(function(response,error) {
            if(error)
            {
                console.log("error is "+JSON.stringify(error))
                return res.status(500).send({ error: 'getUsers returned error'+err });
            }
            else
            {
                console.log(JSON.stringify("Users retrieved"+JSON.stringify(response)));
                return res.json(response);
            }
        })
};

exports.approveUser = function(req, res) {
    console.log('inside Admin delete controller')

    var query = "update users set approved=1 where email=\""+req.query.email+"\"";
    console.log(query);
    sequelize.query(query, {type: sequelize.QueryTypes.UPDATE})
        .then(function(response,error) {
            if(error)
            {
                console.log("error is "+JSON.stringify(error))
                return res.status(500).send({ error: 'getUsers returned error'+err });
            }
            else
            {
                return res.json(response);
            }
        })
};