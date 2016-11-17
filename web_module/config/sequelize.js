/**
 * Created by vipul on 4/23/2016.
 */

var Sequelize = require('sequelize');

var sequelize = new Sequelize('citenet', 'root', 'admin', {
    host: 'localhost',
    dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
    port:    3300, // or 5432 (for postgres)
    logging: console.log
});
sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
        var query = "select * from users;"
        //var query = "exec dbo.sp_insert_person 'vipul.sarin@google.com','abcde','Vipul','Sarin'";
       //var query = "select [dbo].[udf_authenticate]('abc@bcd.com','pass')";
       //var query = "exec dbo.sp_retrieve_new_requests 'mayteh.kendall@yahoo.com',3"
        sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
            .then(function(users) {
                console.log(JSON.stringify(users));
            })

    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });


exports.getSequelize = sequelize;