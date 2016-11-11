/**
 * Created by sarin on 11/8/16.
 */
var shortest_path = require('../controllers/shortest_path.server.controller');

module.exports = function(app) {
    app.route('/api/getShortestPath')
        .get(shortest_path.getShortestPath);
};