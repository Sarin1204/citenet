/**
 * Created by vipul on 4/23/2016.
 */
var index = require('../controllers/index.server.controller')

exports.home = function(app){
    app.get('/', index.renderHome);
};