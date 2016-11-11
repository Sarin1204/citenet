/**
 * Created by sarin on 11/6/16.
 */
var roles = require('../controllers/roles.server.controller');

module.exports = function(app){
    app.get('/api/getRoles', roles.getRoles);
};