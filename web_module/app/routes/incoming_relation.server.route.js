/**
 * Created by Dhruvraj on 11/14/2016.
 */

var incoming_relation = require('../controllers/incoming_relation.server.controller');

module.exports = function(app) {
    app.route('/api/getIncomingRelation')
        .get(incoming_relation.getIncomingRelation);
};