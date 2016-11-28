/**
 * Created by sarin on 11/26/16.
 */
var typeaheadController = require('../controllers/typeahead.server.controller');

module.exports = function(app){
    app.route('/api/typeAheadSubjects/:val/:entityType')
        .get(typeaheadController.typeAheadSubjectAreas)
};