/**
 * Created by Dhruvraj on 11/11/2016.
 */
var subject_area_connection = require('../controllers/subject_area_connection.server.controller');

module.exports = function(app) {
    app.route('/api/getSubjAreaConn')
        .get(subject_area_connection.getSubjAreaConn);
};