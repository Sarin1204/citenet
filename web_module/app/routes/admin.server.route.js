var adminController = require('../controllers/admin.server.controller');

module.exports = function(app){
    console.log("Inside Admin Server");
    app.route('/api/adminDisplay').get(adminController.adminDisplay);
    app.route('/api/deleteUser').get(adminController.deleteUser);
    app.route('/api/approveUser').get(adminController.approveUser);
}