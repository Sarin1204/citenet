/**
 * Created by Dhruvraj on 12/1/2016.
 */
var usController = require('../controllers/usersettings.server.controller.js');

module.exports = function(app){
    console.log("Inside UserSettings Server");
    app.route('/api/resetPassword').get(usController.resetpassword);
    app.route('/api/updateUserDetails').get(usController.updateuser);
}