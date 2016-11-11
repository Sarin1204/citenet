/**
 * Created by sarin on 11/6/16.
 */

var sequelize = require("../../config/sequelize").getSequelize;

exports.getRoles = function(req, res) {
    console.log('inside getRoles controller')

    // var query = "exec dbo.sp_insert_person 'vipul.sarin@google.com','abcde','Vipul','Sarin'"
    var query = "select * from roles";
    sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
        .then(function(response,error) {
            if(error)
            {
                console.log("error is "+JSON.stringify(error))
                return res.status(500).send({ error: 'getRoles returned error'+err });
            }
            else
            {
                console.log(JSON.stringify("exec dbo.sp_toprequests successful"+JSON.stringify(response)));
                return res.json({"roles":response});
            }
        })
};